import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native'


class CounterApp extends Component {
  state = {
    counter: 0
  }

  increaseCount = () => {this.setState({counter: this.state.counter + 1})}

  decreaseCount = () => {this.setState({counter: this.state.counter - 1})}

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', width: 200,
        justifyContent: 'space-around' }}>
          <Text>Hello</Text>
        </View>
      </View>
    );
  }
}

export default CounterApp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
