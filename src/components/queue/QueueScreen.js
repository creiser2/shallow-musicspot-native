import React, { Component } from 'react';
import { HOMESCREEN_BACKGROUND, WHITE } from '../../../constants/colors';
import PlaybackView from '../common/PlaybackView';
import { connect } from 'react-redux';
  
  import {
      StyleSheet,
      View,
      TouchableHighlight,
      TouchableOpacity,
      TextInput
    } from 'react-native'
  
    import {
       Container,
       Header,
       Content,
       Card, 
       CardItem, 
       Thumbnail, 
       Text,
       Button, 
       Icon, 
       Left, 
       Body, 
       Right } from 'native-base';
  
  
  
   class QueueScreen extends Component {
    state = {
  
    }

    componentDidMount = () => {
      console.log(this.props)
    }
    

    upVote = (song) => {
      song.numVotes += 1
    }

    downVote = (song) => {
      if(song.numVotes != 0){
        song.numVotes -= 1
      }
    }

    renderSong2 = () => {
      console.log("hit song render")
      if(this.props.songs.songs){
        console.log("hit song render- not null")
        this.props.songs.songs.map( (song) => this.renderSong(song) )
      }
    }

    renderSong = (song) => {
      console.log("rendering song:",song.name)
          return (
        //     <View key={song.id} style={styles.songContainer}>
        //     <View style={styles.thumbnail}>
        //       <Thumbnail source={{uri: song.imageURL}} />
        //     </View>
        //      <View style={styles.title}>
        //       <Text style={styles.titleText}>{song.name} -{song.artistName}</Text>
        //     </View> 
        //      <View style={styles.time}>
        //       <Text style={styles.timeText}>{song.numVotes}</Text>
        //      </View>
        //      <TouchableOpacity
        //           style={styles.joinButton}
        //           onPress={() => this.playSearchedSong(song)}>
        //               <Text style={styles.joinButtonText}>Play Song</Text>
        //         </TouchableOpacity>
  
        // </View>
          <Card key={song.id}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: song.imageURL}} />
              </Left>
              <Body>
               <Text>{song.name}</Text>
               <Text note>{song.artistName}</Text>
              </Body>
              <Right>
                <Button transparent onPress={() => upVote(song) }>
                  <Icon name="arrow-up" />
                </Button>   
                <Text>{song.numVotes}</Text>
                <Button transparent onPress={() => downVote(song) }>
                  <Icon name="arrow-down" />
                </Button>
              </Right>
            </CardItem>
          </Card>
        )}

  

    
      render() {
        console.log(this.props)
          return (
              <Container style={{backgroundColor: HOMESCREEN_BACKGROUND}}>
                 <Header transparent>
                   <Left>
                     <Button transparent onPress={() => this.props.navigation.navigate('MapScreen')}>
                         <Icon name="arrow-back" />
                     </Button>
                   </Left>
                   <Body>
                     <Text>QueueScreen</Text>
                   </Body>
                   <Right>
                     <Button transparent onPress={() => this.props.navigation.navigate('QueueSearch')} >
                       <Text>Search</Text>
                     </Button>
                   </Right>
                  </Header>
                  {this.renderSong2()}
              </Container>
          );
      }
  }

  const msp = (state) => {
    //since we have multiple reducers, we need to reference our user reducer
    const userState = state.user
    const mapState = state.map
    const queueState = state.queue
    return {
      ...userState,
      ...mapState,
      ...queueState
    }
  }

const mdp = (dispatch) => {
  return {
    
  }
}

export default connect(msp, mdp)(QueueScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HOMESCREEN_BACKGROUND,
  },
  test: {
      color: WHITE,
      fontSize: 24,
      textAlign: 'center',
      padding: 50
  },
  joinButton: {
    backgroundColor: '#1c06e2',
    alignItems: 'center',
    padding: 10,
    margin:10,
    borderRadius:10,
  },
  joinButtonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight:'bold',
    fontSize: 24
  },
  playbackContainer: {
    height: '10%',
    backgroundColor:  HOMESCREEN_BACKGROUND,
    flexDirection: 'row',
    borderTopColor: 'grey',
    borderTopWidth: 1,
  }
});
