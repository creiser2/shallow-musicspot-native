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


import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native'


class HomeScreen extends Component {
  state = {
    users: [],
    isLoggedIn: false,
    fontLoaded: false,
  }

  _handleGuestUser = () => {
    firebase.auth().signInAnonymously()
    .then((res) => {
      //we will need middleware like redux-thunk here to only navigate after the state is set, but for now it is fine technically
      this.props.makeGuest()
      //save the uid username to redux
      // console.log("\n\nRESPONSE: ", res.key("uid"))
      this.props.navigation.navigate('MapScreen')
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }

  _waitForAuth = () => {
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

  printUsers = () => {
    console.log(this.state.users)
  }

  _getUsersFromTest = () => {
   
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
    //this._getUsersFromTest();

    //this._addUserToTest("Tony", 132)
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
            
            <Text style={styles.info} onPress={() => this.toggleMaps()}> >>Login or Continue as Guest</Text>
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
    height: 200,
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
