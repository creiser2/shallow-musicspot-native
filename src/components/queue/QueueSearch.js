import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native';
import { AUTHORIZE_SPOTIFY, HEADERS } from '../../../constants/api/spotify';
import { HOMESCREEN_BACKGROUND, WHITE } from '../../../constants/colors';
import axios from 'axios';
import Song from '../../customClasses/Song'
import { Thumbnail } from 'native-base';
import { updateSongs } from '../../api/FirebaseSession';


import {
  AppRegistry,
  StyleSheet, 
  TouchableOpacity,
  View,
  TextInput,
  Text,
} from 'react-native'

const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQgZ48o39T52Ycjne2VfHtDdR08ftNInjPaTuwFzWyWEKdJJgg'

class QueueSearch extends Component {
  state = {
    songSearch: "",
    searchResults: [],

  }
  componentDidMount = async () => {
    
  }

  playSearchedSong = async (song) => {
    let playerURL = `https://api.spotify.com/v1/me/player/play`
    const searchResults = await axios.put(playerURL, {"uris": [song.uri]}, {
      headers: {
        "Authorization": `Bearer ${this.props.user.spotify_access_token}`
      },
    });

    // Update Firebase songs table
    let newSongs = [song].concat(songs)
    updateSongs(this.props.queueId)

  }

  parseJsonToSongs = (searchResults) => {
    tempSongArray=[];
    searchResults.data.tracks.items.map((song) => {
      //console.log(JSON.stringify(song));
      if(song.album.images){
        var tempSong = new Song(song.id, song.name, song.artists[0].id, song.artists[0].name, song.uri,song.duration_ms,song.explicit,song.album.images[0].url)
      }else{
        var tempSong = new Song(song.id, song.name, song.artists[0].id,song.artists[0].name, song.uri,song.duration_ms,song.explicit, defaultImage)
      }
      tempSongArray.push(tempSong)
    });
    this.setState({searchResults:tempSongArray})
  }

  searchSpotify = async () => {
    let searchURL = `https://api.spotify.com/v1/search?q=${this.state.songSearch}&type=track&limit=3`
    const searchResults = await axios.get(searchURL, {
      headers: {
        "Authorization": `Bearer ${this.props.user.spotify_access_token}`
      }
    });
    this.parseJsonToSongs(searchResults)
  }

  renderSongObj = (song) => {
    return (
        
      <View key={song.id} style={styles.songContainer}>
          <View style={styles.thumbnail}>
            <Thumbnail source={{uri: song.imageURL}} />
          </View>
           <View style={styles.title}>
            <Text style={styles.titleText}>{song.name} -{song.artistName}</Text>
          </View> 
           <View style={styles.time}>
            <Text style={styles.timeText}>{song.numVotes}</Text>
           </View>
           <TouchableOpacity
                style={styles.joinButton}
                onPress={() => this.playSearchedSong(song)}>
                    <Text style={styles.joinButtonText}>Play Song</Text>
              </TouchableOpacity>

      </View>
    
  
    );
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
                value={this.state.songSearch}
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
              <View>
                {this.state.searchResults.map( (song) => this.renderSongObj(song) )}
              </View>
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
    backgroundColor: HOMESCREEN_BACKGROUND,
  },
  songContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 100,
    width: '85%',
    marginLeft: 15,
    marginRight: 15
  },
  thumbnail: {
    alignSelf: "center",
  },
  title: {
    alignSelf: "center",
    width: 180
  },
  time: {
    alignSelf: "center"
  },
  titleText: {
    color: 'white',
    fontSize: 16
  },
  timeText: {
    color: 'white',
    fontSize: 13,
    opacity: 0.7,
    alignSelf:"flex-end",
    marginLeft:10
  }
});
