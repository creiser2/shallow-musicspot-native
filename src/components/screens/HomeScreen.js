import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { AUTHORIZE_SPOTIFY, HEADERS } from '../../../constants/api/spotify';
import { HOMESCREEN_BACKGROUND, WHITE } from '../../../constants/colors';
import SpotifyLogo from '../../../assets/svg/SpotifyLogo';
import GuestSvg from  '../../../assets/svg/GuestSvg';
import { Font } from 'expo';
import MapScreen from './MapScreen';



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


  async componentDidMount() {
    // await Font.loadAsync({
    //   'MyriadProRegular': require('../../assets/fonts/MyriadProRegular.ttf'),
    // });

    // this.setState({ fontLoaded: true });
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

  guestLogoClick  = ()  =>  {
    console.log("guest")
  }


  render() {
    //once logged into spotify, conditionally render homescreen components
    if (this.state.isLoggedIn) {
      return (
        <MapScreen />
      );
    } else {
      return (
        <SafeAreaView style={{flex: 1, backgroundColor: HOMESCREEN_BACKGROUND}}>
          <View style={styles.container}>
            <View style={styles.topBar}>
              <Text style={styles.title} onPress={() => this.handleWelcomeClicked()}>
                QueueMe
              </Text>
            
            <Text style={styles.info} onPress={() => this.toggleMaps()}> >>Login or Continue as Guest</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#333333'}}>
            <SpotifyLogo foregroundColor={this.state.spotifyLogo.foregroundColor} backgroundColor={this.state.spotifyLogo.backgroundColor} spotifyLogoClick={() => this.spotifyLogoClick()}/>
            <GuestSvg backgroundColor={HOMESCREEN_BACKGROUND} guestLogoClick={() => this.guestLogoClick()}/>
          </View>
          <View style={styles.bottomBar}>
              <Text style={styles.title} onPress={() => this.handleWelcomeClicked()}>
                  [][][][][][][][][][]
              </Text>
          </View>
        </View>
        </SafeAreaView>
      );
    }
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
    
  },
});
