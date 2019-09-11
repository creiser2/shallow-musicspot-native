import React, { Component } from 'react';
//import { connect } from 'react-redux';
import { HOMESCREEN_BACKGROUND, WHITE } from '../../../constants/colors';
import { Thumbnail, Text } from 'native-base';

import {
  AppRegistry,
  StyleSheet, 
  View,
} from 'react-native'

export default class PlaybackView extends Component {
  state = {

  }
  componentDidMount = () => {

  }
  render() {
    if(this.props.songs.songs && this.props.songs.songs.length > 0) {
      const song = this.props.songs.songs[0]
      const imageUri = song.explicit //bug
      const timeString = '1:04 | 2:32'
      const songString = song.name + " " + song.artistName
      return (
        <View style={styles.container}>
            <View style={styles.thumbnail}>
              <Thumbnail source={{uri: imageUri}} />
            </View>
            <View style={styles.title}>
              <Text style={styles.titleText}>{songString}</Text>
            </View>
            <View style={styles.time}>
              <Text style={styles.timeText}>{timeString}</Text>
            </View>
        </View>
      );
    }
    else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 100,
    width: '100%',
    marginLeft: 15,
    marginRight: 15
  },
  thumbnail: {
    alignSelf: "center",
  },
  title: {
    alignSelf: "center",
    width: 180
  },
  time: {
    alignSelf: "center"
  },
  titleText: {
    color: 'white',
    fontSize: 16
  },
  timeText: {
    color: 'white',
    fontSize: 13,
    opacity: 0.7
  }
});
