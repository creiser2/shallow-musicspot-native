import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native';
import { AUTHORIZE_SPOTIFY, HEADERS } from '../../../constants/api/spotify';
import { HOMESCREEN_BACKGROUND, WHITE } from '../../../constants/colors';
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
  return {
  }
}

//mapDispatchToProps
const mdp = (dispatch) => { 
  return {

  }
}

export default connect(msp, mdp)(Settings)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
