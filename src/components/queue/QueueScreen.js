import React, { Component } from 'react';
import { HOMESCREEN_BACKGROUND, WHITE } from '../../../constants/colors';
import PlaybackView from '../common/PlaybackView';

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



export default class QueueScreen extends Component {
    render() {
        const props = this.props
        return (
            <Container>
               <Header />
                 <Content>
                     <Card>
                       <CardItem>
                          <Left>
                            <Thumbnail source={{uri: 'Image URL'}} />
                            <Body>
                                <Text>NativeBase</Text>
                                <Text note>GeekyAnts</Text>
                            </Body>
                           </Left>
                           <Right>
                              <Button transparent>
                                 <Icon active name="chevron-up" />
                                 <Text>+5</Text>
                                 <Icon active name="chevron-down" />
                              </Button>
                           </Right>
                        </CardItem>
                     </Card>
                 </Content>
             </Container>
           <View style={styles.container}>
                    <Text style={styles.test}>Queue Screen</Text>
                    <TouchableOpacity
                        style={styles.joinButton}
                        onPress={() => this.props.navigation.navigate('MapScreen')}
                    >
                        <Text style={styles.joinButtonText}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.joinButton}
                        onPress={() => this.props.navigation.navigate('QueueSearch')}
                    >
                        <Text style={styles.joinButtonText}>Queue Search</Text>
                    </TouchableOpacity>
                    <View style={styles.playbackContainer}>
                      <PlaybackView/>
                    </View>
                </View> 
        );
    }
}

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
