import React, { Component } from 'react';
//import { connect } from 'react-redux';
import { HOMESCREEN_BACKGROUND, WHITE } from '../../../constants/colors';
import { Thumbnail, Text } from 'native-base';

import {
  AppRegistry,
  StyleSheet, 
  View,
} from 'react-native'

const imageUri = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQgZ48o39T52Ycjne2VfHtDdR08ftNInjPaTuwFzWyWEKdJJgg'
const timeString = '1:04 | 2:32'
const songString = 'Lil Wayne - 500 Degreez     '

class PlaybackView extends Component {
  state = {

  }
  componentDidMount = () => {

  }
  render() {
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

export default PlaybackView;