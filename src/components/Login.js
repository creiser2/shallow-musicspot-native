import React, { Component } from 'react';
// import SvgIcon from 'react-native-svg-icon';
// import Icon from './Icon'; // point to your Icon.js location
//<Icon name="SpotifyIcon" width="50" height="50"/>
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native'


class Login extends Component {
  state = {
    WelcomeClicked: false
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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topBar}>

          <TouchableOpacity style={styles.login} onPress={() => {this.handleWelcomeClicked()}}>
            <Text style={styles.login}>Android</Text>
          </TouchableOpacity>
          {this.state.WelcomeClicked ?
            <Text style={styles.info}>Login Below to Get Started.</Text>
          :
            <Text style={styles.info}>Rolf.</Text>
          }

        </View>
        <View style={{flex: 3, backgroundColor: 'white'}}>

        </View>
      </View>
    );
  }
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
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
  }
});
