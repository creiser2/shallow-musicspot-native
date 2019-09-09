import React, { Component } from 'react';
import { HOMESCREEN_BACKGROUND, WHITE } from '../../../constants/colors';
import PlaybackView from '../common/PlaybackView';

import {
    StyleSheet,
    Text,
    Button,
    View,
    TouchableHighlight,
    TouchableOpacity,
    TextInput
  } from 'react-native'

export default class QueueScreen extends Component {
    render() {
        const props = this.props
        return (
                <View style={styles.container}>
                    <Text style={styles.test}>Qeueu Screen</Text>
                    <TouchableOpacity
                        style={styles.joinButton}
                        onPress={() => this.props.navigation.navigate('MapScreen')}
                    >
                        <Text style={styles.joinButtonText}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.joinButton}
                        onPress={() => this.props.navigation.navigate('QueueSearch')}
                    >
                        <Text style={styles.joinButtonText}>Queue Search</Text>
                    </TouchableOpacity>
                    <View style={styles.playbackContainer}>
                      <PlaybackView/>
                    </View>
                </View> 
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HOMESCREEN_BACKGROUND,
  },
  test: {
      color: WHITE,
      fontSize: 24,
      textAlign: 'center',
      padding: 50
  },
  joinButton: {
    backgroundColor: '#1c06e2',
    alignItems: 'center',
    padding: 10,
    margin:10,
    borderRadius:10,
  },
  joinButtonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight:'bold',
    fontSize: 24
  },
  playbackContainer: {
    height: '10%',
    backgroundColor:  HOMESCREEN_BACKGROUND,
    flexDirection: 'row',
    borderTopColor: 'grey',
    borderTopWidth: 1,
  }
});
