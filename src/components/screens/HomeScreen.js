import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native';
import { AUTHORIZE_SPOTIFY, HEADERS } from '../../../constants/api/spotify';
import { HOMESCREEN_BACKGROUND, WHITE } from '../../../constants/colors';
import SpotifyLogo from '../../../assets/svg/SpotifyLogo';
import GuestSvg from  '../../../assets/svg/GuestSvg';
import { Font } from 'expo';
import MapScreen from './MapScreen';
import { addGuest } from '../../../store/actions/userActions';
import { db } from '../../../FirebaseConfig';
import firebase from 'firebase';
import axios from 'axios';
import {WebView} from 'react-native';



import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native'


class HomeScreen extends Component {
  state = {
    requestURL: null,
    showSpotifyLogin: false
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

  //Begin Spotify Auth
  spotifyLogoClick = () => {
    console.log("clicked")
    axios.get('https://accounts.spotify.com/authorize', {
    params: {
        client_id: '57d4048f0a944cc7b74afc0609746fa8',
        response_type: 'code',
        redirect_uri: 'localhost:19002',
        show_dialog: true
      }
    })
    .then(res => {
      this.setState({
        requestURL: res.request.responseURL,
        showSpotifyLogin: true
      });
      console.log("RES: ", res.request.responseURL)
    })
    .catch(err => console.log("ERR: ", err))

    
    // .then(req => 
    // axios({
    //   method: 'post',
    //   url: `https://accounts.spotify.com/api/token`,
    //   data: { // in axios data is the body request
    //     grant_type: 'authorization_code',
    //     code: req.query.code, // code I'm receiving from https://accounts.spotify.com/authorize
    //     redirect_uri: 'http://localhost:19002/'
    //   },
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     'Authorization': 'Basic ' + Buffer.from(`57d4048f0a944cc7b74afc0609746fa8:f1768d96ad574a8784317dca580cd471`).toString('base64') // client id and secret from env
    //   }
    // }))
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

  renderSpotifyRequestPage = () => {
    if(this.state.showSpotifyLogin) {
      console.log("State:", this.state.requestURL);
      return (
        <WebView
          source={{uri: this.state.requestURL}}
          style={{marginTop: 20}}
        />
      )
    } else {
        return (
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
                    {this.renderAccountCreationFailed()}
                </View>
          </View>
        )
    }
  }


  


  render() {
    let accountCreationFailed = this.renderAccountCreationFailed();
    if(this.props.isGuest) {
      this.props.navigation.navigate('MapScreen')
    }
    //once logged into spotify, conditionally render homescreen components
      return (
        <SafeAreaView style={{flex: 1, backgroundColor: HOMESCREEN_BACKGROUND}}>
            {this.renderSpotifyRequestPage()}
        </SafeAreaView>
      );
    }
  }

//Redux setup

//mapStateToProps
const msp = (state) => {
  let userState = state.user
  return {
    isGuest: userState.isGuest,
    guestCreationFailed: userState.guestCreationFailed
  }
}

//mapDispatchToProps
const mdp = (dispatch) => { 
  return {
    addGuest: () => dispatch(addGuest())
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
