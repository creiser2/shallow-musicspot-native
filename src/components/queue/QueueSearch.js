import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native';
import { AUTHORIZE_SPOTIFY, HEADERS } from '../../../constants/api/spotify';
import { HOMESCREEN_BACKGROUND, WHITE } from '../../../constants/colors';
import axios from 'axios';


import {
  AppRegistry,
  StyleSheet, 
  TouchableOpacity,
  Text,
  View,
  TextInput,
} from 'react-native'


class QueueSearch extends Component {
  state = {
    songSearch: "",
    searchResults: null,
  }
  componentDidMount = () => {

  }

  searchSpotify = async () => {
    let searchURL = `https://api.spotify.com/v1/search?q=${this.state.songSearch}&type=album,track,artist,playlist&limit=5`
    const songResponse = await axios.get(searchURL, {
      headers: {
        "Authorization": `Bearer ${this.props.user.spotify_access_token}`
      }
    });
    this.setState({searchResults: songResponse})
    console.log("res:"+JSON.stringify(songResponse));
  }

  render() {
      return (
        <SafeAreaView style={{flex: 1, backgroundColor: HOMESCREEN_BACKGROUND}}>
          <View style={styles.container}>
            <View style={styles.topBar}>
              <Text style={styles.title}>Queue Search</Text>
              <TextInput
                style={styles.inputQueueNameAndSong}
                enablesReturnKeyAutomatically={true}
                selectTextOnFocus={true}
                placeholder="Insert song to search for: "
                onChangeText={(songSearch) => this.setState({songSearch})}
                value={this.state.insertQueueName}
              />
              <TouchableOpacity
                style={styles.joinButton}
                onPress={() => this.searchSpotify()}>
                    <Text style={styles.joinButtonText}>Search API for song</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.joinButton}
                onPress={() => this.props.navigation.navigate('QueueScreen')}>
                    <Text style={styles.joinButtonText}>Back to Queue Search</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.joinButton}
                onPress={() => console.log(this.state.searchResults)}>
                    <Text style={styles.joinButtonText}>Print songs</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      );
    }
  }

//Redux setup

const msp = (state) => {
  //since we have multiple reducers, we need to reference our user reducer
  const userState = state.user
  const mapState = state.map
  return {
    ...userState,
    ...mapState
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
