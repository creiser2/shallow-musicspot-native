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
          <TouchableOpacity onPress={() => this.increaseCount()}>
            <Text style={{ fontSize: 50 }}>+</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 50 }}>{this.state.counter}</Text>
          <TouchableOpacity onPress={() => this.decreaseCount()}>
            <Text style={{ fontSize: 50 }}>-</Text>
          </TouchableOpacity>
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
