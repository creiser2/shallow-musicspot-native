import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { AUTHORIZE_SPOTIFY, HEADERS } from '../../../constants/api/spotify';
import { HOMESCREEN_BACKGROUND, WHITE } from '../../../constants/colors';
import SpotifyLogo from '../../../assets/svg/SpotifyLogo';
import GuestSvg from  '../../../assets/svg/GuestSvg';
import { Font } from 'expo';
import MapScreen from './MapScreen';
import { db } from '../../../FirebaseConfig';
import firebase from 'firebase';


import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native'


class Login extends Component {
  state = {
    users: [],
    WelcomeClicked: true,
    isLoggedIn: false,
    fontLoaded: false,
    spotifyLogo: {
      foregroundColor:  "#57b560",
      backgroundColor:  "#58605B",
    }
  }

  handleGuestUser = () => {
    firebase.auth().signInAnonymously()
    .then((res) => {
      console.log("RES:", res)
      this.props.navigation.navigate('MapScreen')
    })
    .catch(function(error) {
        // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }

  waitForAuth = () => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        console.log("\nUID: ", uid)
      }
    });
  }


  componentDidMount = () => {
    // await Font.loadAsync({
    //   'MyriadProRegular': require('../../assets/fonts/MyriadProRegular.ttf'),
    // });

    // this.setState({ fontLoaded: true });
  }

  _getUsersFromTest = () => {
    console.log('Entered GET');
      users = [];
      db.collection("test").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
        user= {
          name: `${doc.data().name}`,
          age: `${doc.data().age}`,
        };
        console.log(user.name)
        users.push(user);
        });
      });
    this.setState({users});
    //this.state.users.forEach( (user) => console.log(user.name));
  }

  _addUserToTest = (inName, inAge) => {
    db.collection("test").add({
      name: inName,
      age: inAge,
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
    this._getUsersFromTest();

    this._addUserToTest("Tony", 132)
  }

  handleQueueMeText = () => {
    console.log("QUE TEXT CLICKED")
  }

  guestLogoClick  = ()  =>  {
    this.handleGuestUser()
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
            <GuestSvg backgroundColor={HOMESCREEN_BACKGROUND} guestLogoClick={() => this.guestLogoClick()}/>
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
