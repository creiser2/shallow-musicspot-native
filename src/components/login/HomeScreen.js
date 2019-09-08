import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, WebView } from 'react-native';
import { AUTHORIZE_SPOTIFY, HEADERS } from '../../../constants/api/spotify';
import { HOMESCREEN_BACKGROUND, WHITE } from '../../../constants/colors';
import SpotifyLogo from '../../../assets/svg/SpotifyLogo';
import GuestSvg from  '../../../assets/svg/GuestSvg';
import { Font } from 'expo';
import MapScreen from '../map/MapScreen';
import { addGuest } from '../../../store/actions/userActions';

//import InAppBrowser from 'react-native-inappbrowser-reborn';

import {
  AppRegistry,
  StyleSheet, 
  TouchableOpacity,
  Text,
  View,
} from 'react-native'

const url = "https://us-central1-queueme-back.cloudfunctions.net/redirect";

class HomeScreen extends Component {

  
  state = {

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


  spotifyLogoClick = () => {
    

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
          <WebView
          source={{uri: url}}
          style={{marginTop: 20}}
          />
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
