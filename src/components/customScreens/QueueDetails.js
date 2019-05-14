import React, { Component } from 'react';
import { MapView } from 'expo';
import { HOMESCREEN_BACKGROUND } from '../../../constants/colors';


import {
    StyleSheet,
    Text,
    Button,
    View,
  } from 'react-native'

export default class QueueDetails extends Component {

    render() {
        const props = this.props
        return (
            <MapView.Callout tooltip={true}>
                <View style={styles.container}>
                    <View style={styles.titleContainer}> 
                        <Text style={styles.title}>Current Song: {props.name}</Text>
                    </View>
                    <View style={styles.horizontalRule}/>                    
                    <View style={styles.subTitleContainer}>
                        <Text style={styles.subTitle}>Yes...</Text>
                    </View>
                </View> 
            </MapView.Callout>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '50%',
    height: 200,
    backgroundColor: HOMESCREEN_BACKGROUND,
    borderColor: 'white',
    borderWidth: 1,
    alignItems: 'center'
  },
  title: {
      fontSize: 30,
      color: 'white'
  },
  subTitle: {
    fontSize: 20,
    color: 'white',
  },
  titleContainer: {
    paddingBottom: '4%',
    paddingTop: '2%',
  },
  subTitleContainer: {

  },
  horizontalRule: {
      borderBottomColor: 'white',
      borderBottomWidth: 2
  }
});
