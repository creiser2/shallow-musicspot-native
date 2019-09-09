import React, { Component } from 'react';
import { MapView } from 'expo';
import { HOMESCREEN_BACKGROUND } from '../../../constants/colors';
import NewQueueSvg from '../../../assets/svg/NewQueueSvg';

import {
    StyleSheet,
    Text,
    Button,
    Image,
    View,
    TouchableHighlight,
    TouchableOpacity,
    TextInput
  } from 'react-native'

export default class QueueDetail extends Component {
    render() {
        if(this.props.queueClicked){
            let objIndex = this.props.renderRegions.findIndex((obj => obj.id == this.props.currentQueue.id));
            let queueClicked = this.props.renderRegions[objIndex];
            return(
              <View style={styles.moreQueueInfo}>
                <Text style={styles.moreInfoText}>Queue Name: {queueClicked.name}</Text>
                <Text style={styles.moreInfoText}>Current Song: {queueClicked.currentSong}</Text>
                <View style={styles.rowFlex}>
                  <Image
                    style={styles.groupIcon}
                    source={require('../../../assets/groupIcon.png')}
                  />
                  <Text style={styles.moreInfoText}>{queueClicked.numMembers}</Text>
                </View>
                <TouchableOpacity
                  style={styles.joinButton}
                  onPress={() => this.props.joinQueue()}
                >
                  <Text style={styles.joinButtonText}>Join</Text>
                </TouchableOpacity>
              </View>
            )
          }else if(this.props.addingQueueForm){
            //the name will be from a form and current song somewhere else but this will be changed
            return (
              <View>
                <TextInput
                  style={styles.inputQueueNameAndSong}
                  enablesReturnKeyAutomatically={true}
                  selectTextOnFocus={true}
                  placeholder="Insert Queue Name"
                  onChangeText={(insertQueueName) => this.props.updateQueueName(insertQueueName)}
                  value={this.props.insertQueueName}
                />
                <TextInput
                  style={styles.inputQueueNameAndSong}
                  enablesReturnKeyAutomatically={true}
                  selectTextOnFocus={true}
                  onChangeText={(insertCurrSong) => this.props.updateSongName(insertCurrSong)}
                  placeholder="Insert Current Song"
                  value={this.props.insertCurrSong}
                />
                <TouchableOpacity
                  style={styles.joinButton}
                  onPress={() =>  this.props.submitNewQueueAndClose()}
                >
                  <Text style={styles.joinButtonText}>Done</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.joinButton}
                  onPress={() => this.props.updateAddingQueueForm(false)}
                >
                  <Text style={styles.joinButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            )
          }else{
            return (
                <NewQueueSvg canCreateQueueAtLocation={this.props.canCreateQueueAtLocation} createQueueClicked={() => this.props.createQueueClicked()}/>
            );
          }
    }
}

const styles = StyleSheet.create({
    moreQueueInfo: {
        flex: 1,
        backgroundColor: 'white',
        height: 10,
    },
    moreInfoText: {
        textAlign: 'center',
        fontSize: 22,
    },
    rowFlex: {
        flexDirection: 'row',
    },
    groupIcon: {
        height: 30,
        width: 30,
        marginLeft: 40
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
        fontSize: 12
    },
    inputQueueNameAndSong: {
        height: 50, 
        borderColor: 'gray',
        borderWidth: 1,
        padding: 5,
        margin: 5,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },

  container: {
    flex: 1,
    width: '50%',
    height: 200,
    backgroundColor: HOMESCREEN_BACKGROUND,
    borderColor: 'white',
    borderWidth: 1,
    alignItems: 'center'
  },
  title: {
      fontSize: 30,
      color: 'white'
  },
  subTitle: {
    fontSize: 20,
    color: 'white',
  },
  titleContainer: {
    paddingBottom: '4%',
    paddingTop: '2%',
  },
  subTitleContainer: {

  },
  horizontalRule: {
      borderBottomColor: 'white',
      borderBottomWidth: 2
  }
});