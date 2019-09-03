import React, { Component } from 'react';
//import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native';
import { HOMESCREEN_BACKGROUND, WHITE } from '../../../constants/colors';

import {
  AppRegistry,
  StyleSheet, 
  TouchableOpacity,
  Text,
  View,
} from 'react-native'


class PlaybackView extends Component {
  state = {

  }
  componentDidMount = () => {

  }
  render() {
      return (
        <SafeAreaView style={{flex: 1, backgroundColor: HOMESCREEN_BACKGROUND}}>
          <View style={styles.container}>
            <View style={styles.topBar}>
              <Text style={styles.title}>PlaybackView</Text>
            </View>
          </View>
        </SafeAreaView>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});