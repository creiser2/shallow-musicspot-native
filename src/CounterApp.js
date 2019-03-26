import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native'

import { connect } from 'react-redux';


class CounterApp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', width: 200,
        justifyContent: 'space-around' }}>
          <TouchableOpacity onPress={() => this.props.increaseCount()}>
            <Text style={{ fontSize: 50 }}>+</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 50 }}>{this.props.counter}</Text>
          <TouchableOpacity onPress={() => this.props.decreaseCount()}>
            <Text style={{ fontSize: 50 }}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    counter: state.counter
  }
}

function mapDispatchToProps(dispatch) {
  return {
    increaseCount: () => {dispatch({type: 'INCREASE_COUNT'})},
    decreaseCount: () => {dispatch({type: 'DECREASE_COUNT'})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CounterApp)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
