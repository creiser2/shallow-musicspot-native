import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Constants, Svg } from 'expo';
import { HOMESCREEN_BACKGROUND } from '../../constants/colors';


export default class NewQueueSvg extends Component {

    //function renders the color of the createqueuesvg 
    //based on their abiliy to create the queue at the current location
    getColors = () => {
        return this.props.canCreateQueueAtLocation ? 'green'   :   'red'
    }

    render() {
        return (
            <View style={styles.container}>
                <Svg height="100%" width="100%" viewBox="0 0 300 500" onPress={() => this.props.createQueueClicked()}>
                    <Svg.Path
                        d="M250.22 450.55L136.13 267.74c-8.78-14.06-7.68-30.6-7.68-47.18 0-49.24 62.68-100.57 121.77-100.57 58.9 0 121.34 50.31 121.34 100.66 0 16.52 1.09 33.01-7.64 47.04l-113.7 182.86"
                        fill={this.getColors()}
                        stroke="#fff"
                        strokeWidth={8}
                    />
                    <Svg.Circle
                        cx="250.22"
                        cy="227.21"
                        r="35.81"
                        fill={HOMESCREEN_BACKGROUND}
                        stroke="#fff"
                        strokeWidth={8}
                    />
                    <Svg.Circle
                        cx="392.5"
                        cy="91.81"
                        r="48.91"
                        fill={this.getColors()}
                        stroke="#fff"
                        strokeWidth={8}
                    />
                    <Svg.Path
                        d="M424.33 91.81h-63.66"
                        fill="none"
                        stroke="#fff"
                        strokeWidth={8}
                    />
                    <Svg.Path
                        d="M392.38 59.67v63.66"
                        fill="none"
                        stroke="#fff"
                        strokeWidth={8}
                    />
                </Svg>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
      height: '10%',
      borderTopColor: 'grey',
      borderTopWidth: 1,
      position: 'relative'
    },
  });
  