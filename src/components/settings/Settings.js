import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native';
import { AUTHORIZE_SPOTIFY, HEADERS } from '../../../constants/api/spotify';
import { HOMESCREEN_BACKGROUND, WHITE } from '../../../constants/colors';
import SpotifyLogo from '../../../assets/svg/SpotifyLogo';
import GuestSvg from  '../../../assets/svg/GuestSvg';
import { Font } from 'expo';
import MapScreen from '../map/MapScreen';
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


class Settings extends Component {
  state = {

  }



  componentDidMount = () => {

  }

  
  render() {
      return (
        <SafeAreaView style={{flex: 1, backgroundColor: HOMESCREEN_BACKGROUND}}>
          <View style={styles.container}>
            <View style={styles.topBar}>
              <Text style={styles.title}>Settings</Text>
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

export default connect(msp, mdp)(Settings)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
