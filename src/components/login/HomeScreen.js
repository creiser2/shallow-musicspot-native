import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native';
import { AUTHORIZE_SPOTIFY, HEADERS } from '../../../constants/api/spotify';
import { HOMESCREEN_BACKGROUND, WHITE } from '../../../constants/colors';
import SpotifyLogo from '../../../assets/svg/SpotifyLogo';
import GuestSvg from  '../../../assets/svg/GuestSvg';
import { Font } from 'expo';
import MapScreen from '../map/MapScreen';
import { addGuest, setSpotifyToken } from '../../../store/actions/userActions';
import { AuthSession } from 'expo';
import axios from 'axios';
import Spotify from 'rn-spotify-sdk';

import {
  AppRegistry,
  StyleSheet, 
  TouchableOpacity,
  Text,
  View,
} from 'react-native'

class HomeScreen extends Component {

  state = {
    userInfo: null,
    didError: false
  }

  componentDidMount = () => {
    // await Font.loadAsync({
    //   'MyriadProRegular': require('../../assets/fonts/MyriadProRegular.ttf'),
    // });

    // this.setState({ fontLoaded: true });
  }

  handleWelcomeClicked = () => {
    this.setState({
      WelcomeClicked: !this.state.WelcomeClicked
    })
  }

  spotifyLogoClick = async () => {
    //only reauthenticate if the access token is null
    if(!this.props.spotify_access_token){
      let redirectUrl = AuthSession.getRedirectUrl();
      console.log("Your redirect url:", redirectUrl)
      let results = await AuthSession.startAsync({
        authUrl:
        `https://accounts.spotify.com/authorize?client_id=57d4048f0a944cc7b74afc0609746fa8&redirect_uri=${encodeURIComponent(redirectUrl)}&scope=user-read-email,user-modify-playback-state&response_type=token`
      });
      if (results.type !== 'success') {
        this.setState({ didError: true });
      } else {
        const userInfo = await axios.get(`https://api.spotify.com/v1/me`, {
          headers: {
            "Authorization": `Bearer ${results.params.access_token}`
          }
        });
        this.props.setSpotifyToken(results.params.access_token);
        this.setState({ userInfo: userInfo.data });
        this.props.addGuest()
        this.props.navigation.navigate('MapScreen');
      }
    }else{
      this.props.navigation.navigate('MapScreen');
    }
  }


  handleGuestClicked = () => {
    this.props.addGuest()
  }

  renderAccountCreationFailed = () => {
    if(this.props.guestCreationFailed) {
      return <Text style={styles.title}>Error Creating Account</Text>
    } 
    return null
  }

  render() {
    let accountCreationFailed = this.renderAccountCreationFailed();
    if(this.props.isGuest) {
      this.props.navigation.navigate('MapScreen')
    }
    //once logged into spotify, conditionally render homescreen components
      return (
        <SafeAreaView style={{flex: 1, backgroundColor: HOMESCREEN_BACKGROUND}}>
          <View style={styles.container}>
            <View style={styles.topBar}>
              <Text style={styles.title}>
                QueueMe
              </Text>
            
            <Text style={styles.info}> >>Login or Continue as Guest</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#333333'}}>
            <SpotifyLogo spotifyLogoClick={() => this.spotifyLogoClick()}/>
            <GuestSvg backgroundColor={HOMESCREEN_BACKGROUND} guestLogoClick={() => this.handleGuestClicked()}/>
          </View>
          <View style={styles.bottomBar}>
              {accountCreationFailed}
          </View>
        </View>
        </SafeAreaView>
      );
    }
  }

//Redux setup

//mapStateToProps
const msp = (state) => {
  let userState = state.user
  return {
    spotify_access_token: userState.spotify_access_token,
    isGuest: userState.isGuest,
    guestCreationFailed: userState.guestCreationFailed
  }
}

//mapDispatchToProps
const mdp = (dispatch) => { 
  return {
    addGuest: () => dispatch(addGuest()),
    setSpotifyToken: (token) => dispatch(setSpotifyToken(token))
  }
}

export default connect(msp, mdp)(HomeScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    height: '15%',
    backgroundColor: HOMESCREEN_BACKGROUND,
  },
  title: {
    fontSize: 50,
    color: 'white',
    left: 20,
    top: 10
  },
  info: {
    fontSize: 20,
    color: 'white',
    left: 30,
    top:  10
  },
  welcome: {
    fontSize: 15,
    color: '#80aaff',
    fontWeight: 'bold'
  },
  bottomBar: {
    height: 100,
    backgroundColor:  HOMESCREEN_BACKGROUND,
    justifyContent: 'center',
    borderTopColor: 'white',
  },
});
