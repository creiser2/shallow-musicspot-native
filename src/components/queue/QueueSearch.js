import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native';
import { AUTHORIZE_SPOTIFY, HEADERS } from '../../../constants/api/spotify';
import { HOMESCREEN_BACKGROUND, WHITE } from '../../../constants/colors';


import {
  AppRegistry,
  StyleSheet, 
  TouchableOpacity,
  Text,
  View,
} from 'react-native'


class QueueSearch extends Component {
  state = {

  }
  componentDidMount = () => {

  }
  render() {
      return (
        <SafeAreaView style={{flex: 1, backgroundColor: HOMESCREEN_BACKGROUND}}>
          <View style={styles.container}>
            <View style={styles.topBar}>
              <Text style={styles.title}>Queue Search</Text>
              <TouchableOpacity
                style={styles.joinButton}
                onPress={() => this.props.navigation.navigate('QueueScreen')}>
                    <Text style={styles.joinButtonText}>Back to Queue Search</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      );
    }
  }

//Redux setup

//mapStateToProps
const msp = (state) => {
  return {
  }
}

//mapDispatchToProps
const mdp = (dispatch) => { 
  return {

  }
}

export default connect(msp, mdp)(QueueSearch)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
