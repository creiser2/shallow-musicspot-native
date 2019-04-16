import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { AUTHORIZE_SPOTIFY, HEADERS } from '../../../constants/api/spotify';
import { HOMESCREEN_BACKGROUND, WHITE } from '../../../constants/colors';
import SpotifyLogo from '../../../assets/svg/SpotifyLogo';
import GuestSvg from  '../../../assets/svg/GuestSvg';
import { Font } from 'expo';
import MapScreen from './MapScreen';
import { db } from '../../../FirebaseConfig';


import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native'


class Login extends Component {
  state = {
    WelcomeClicked: true,
    isLoggedIn: false,
    fontLoaded: false,
    spotifyLogo: {
      foregroundColor:  "#57b560",
      backgroundColor:  "#58605B",
    }
  }


  componentDidMount = () => {
    // await Font.loadAsync({
    //   'MyriadProRegular': require('../../assets/fonts/MyriadProRegular.ttf'),
    // });

    // this.setState({ fontLoaded: true });
    
    db.collection("test").add({
        name: "Johnny",
        age: -1,
      }).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      }).catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }


  handleWelcomeClicked = () => {
    this.setState({
      WelcomeClicked: !this.state.WelcomeClicked
    })
    console.log("WELCOMESTATE: ", this.state.WelcomeClicked)
  }

  //not maps yet but test for now
  toggleMaps = () => {
    this.setState({
      isLoggedIn: true
    })
  }

  spotifyLogoClick = () => {
    let tempColor = this.state.spotifyLogo.backgroundColor
    console.log("spot click")
    //request to spotify API
    this.setState({
      spotifyLogo: {
        ...this.state.spotifyLogo,
          backgroundColor:  this.state.spotifyLogo.foregroundColor,
          foregroundColor:  tempColor
      }
    })
  }

  handleQueueMeText = () => {
    console.log("QUE TEXT CLICKED")
  }

  guestLogoClick  = ()  =>  {
    console.log("guest")
  }


  render() {
    //once logged into spotify, conditionally render homescreen components
      return (
        <SafeAreaView style={{flex: 1, backgroundColor: HOMESCREEN_BACKGROUND}}>
          <View style={styles.container}>
            <View style={styles.topBar}>
              <Text style={styles.title} onPress={() => this.handleQueueMeText()}>
                QueueMe
              </Text>
            
            <Text style={styles.info} onPress={() => this.toggleMaps()}> >>Login or Continue as Guest</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#333333'}}>
            <SpotifyLogo foregroundColor={this.state.spotifyLogo.foregroundColor} backgroundColor={this.state.spotifyLogo.backgroundColor} spotifyLogoClick={() => this.spotifyLogoClick()}/>
            <GuestSvg backgroundColor={HOMESCREEN_BACKGROUND} guestLogoClick={() => this.props.navigation.navigate('MapScreen')}/>
          </View>
          <View style={styles.bottomBar}>
              <Text style={styles.title}>
                  
              </Text>
          </View>
        </View>
        </SafeAreaView>
      );
    }
  }

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    height: 200,
    backgroundColor: HOMESCREEN_BACKGROUND,
    // justifyContent: 'center',
    // alignItems: 'center',
    
    // borderBottomColor: 'white',
    // borderBottomWidth: 1,
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
