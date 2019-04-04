import React, { Component } from 'react';
//<Icon name="SpotifyIcon" width="50" height="50"/>
import { AUTHORIZE_SPOTIFY, HEADERS } from '../../constants/api/spotify';
import Test from './Test';



import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native'


class Login extends Component {
  state = {
    WelcomeClicked: true,
    isLoggedIn: false
  }

  // increaseCount = () => {this.setState({counter: this.state.counter + 1})}
  //
  // decreaseCount = () => {this.setState({counter: this.state.counter - 1})}

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

  render() {
    //once logged into spotify, conditionally render homescreen components
    if (this.state.isLoggedIn) {
      return (
        <Test />
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.topBar}>
            <Text style={styles.login} onPress={() => this.handleWelcomeClicked()}>Login Below to Get Started.</Text>
            {this.state.WelcomeClicked ?
              <Text style={styles.welcome}>Welcome to QueueMe</Text>
              :
              <Text style={styles.info} onPress={() => this.toggleMaps()}>Go to Maps.</Text>
            }
          </View>
          <View style={{flex: 3, backgroundColor: 'white'}}>
          </View>
        </View>
      );
    }
  }
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    height: 200,
    height: 200,
    backgroundColor: '#292c34',
    justifyContent: 'center',
    alignItems: 'center'
  },
  login: {
    fontSize: 30,
    color: 'white'
  },
  info: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold'
  },
  welcome: {
    fontSize: 15,
    color: '#80aaff',
    fontWeight: 'bold'
  }
});
