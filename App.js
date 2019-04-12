import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Text,
  View
} from 'react-native';

import { createStackNavigator, createAppContainer } from "react-navigation";
import MapScreen  from './src/components/MapScreen';

import { createStore } from 'redux';
import Login from './src/components/Login';

/** What is redux?
 * Store - holds our state - THERE IS ONLY ONE STATE
 * Action - State can be modified using actions - SIMPLE OBJECTS
 * Dispatcher - Action needs to be sent by someone - known as dispatching an action
 * Reducer - receives the action and modifies the state to give us a new state
 *  - pure functions
 *  - only mandatory argument is the 'type'
 * Subscriber - listens for state change to update the ui
 */


class HomeScreen extends Component {
  render() {
    return (
      <Login/>
    );
  }
}

const AppNavigator = createStackNavigator({
    Home: HomeScreen,
    Map:  MapScreen
  },  {
    headerMode: 'none'
  }
);

export default createAppContainer(AppNavigator);

// export default HomeScreen

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


// import React from "react";
// import { View, Text } from "react-native";
// import { createStackNavigator, createAppContainer } from "react-navigation";

// class HomeScreen extends React.Component {

//   render() {
//     return (
//       <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//         <Text>Home Screen</Text>
//       </View>
//     );
//   }
// }

// const AppNavigator = createStackNavigator({
//     Home: {
//       screen: HomeScreen
//     }
//   },  {
//     headerMode: 'none'
//   }
// );


// export default createAppContainer(AppNavigator);