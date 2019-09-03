import React, { Component } from 'react';
import { Permissions, Location, MapView } from 'expo';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native';
import NewQueueSvg from '../../../assets/svg/NewQueueSvg';
import QueueDetails from '../queue/QueueDetails';
import PlaybackView from '../common/PlaybackView';

import {DAY_MAP_STYLE, NIGHT_MAP_STYLE} from '../../../constants/mapstyles';
import {HOMESCREEN_BACKGROUND, WHITE} from '../../../constants/colors';
import { DEFAULT_LATITUDE_DELTA, DEFAULT_LONGITUDE_DELTA } from '../../../constants/map-constants';
import { destroyUser, updateCoords, joinQueue } from '../../../store/actions/userActions';
import { updateMap, createQueue, getQueuesByCity } from '../../../store/actions/mapActions';
import locationSession from '../../api/LocationSession';

import {
  StyleSheet,
  Text,
  Button,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native'


type Position = {
  coords: {
    accuracy: number,
    altitude: number,
      altitudeAccuracy: number,
      heading: number,
      latitude: number,
      longitude: number,
      speed: number,
    },
    timestamp: number,
};

      


class MapScreen extends Component {
  //this provides us with a reference to our mapview object in code
  map = React.createRef();

  state = {
    ready: false,
    region: "",
    city: "",
    canCreateQueueAtLocation: false,
    queueClicked: false,
    currentQueue: {},
    addingQueueForm: false,
    insertQueueName: "",
    insertCurrSong: ""
  };  


  //to remove our watcher, for now we do not want to keep watching location after the component unmounts, but this will change later
  watcher: { remove: () => void };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {

      //get initial location to render in map, this will be later updated by our watcher
      const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync();
      //get city and region/state
      const strLoc =  await Location.reverseGeocodeAsync({ latitude, longitude })

      //snap map to user location
      this.props.updateMap({latitude, longitude, latitudeDelta: DEFAULT_LATITUDE_DELTA, longitudeDelta: DEFAULT_LONGITUDE_DELTA})
      
      //update in redux the user position
      this.props.updateCoords({latitude, longitude})

      
      this.setState({ ready: true, city: strLoc[0].city, region: strLoc[0].region });
      
      //start watching position
      const options = { enableHighAccuracy: true, timeInterval: 1000, distanceInterval: 1 };
      
      //get all cities based on city and region
      this.props.getQueuesByCity(this.state.region, this.state.city)
      
      //the onNewPosition function will be called for each new position captured after 1 second
      this.watcher = await Location.watchPositionAsync(options, this.onNewPosition); 
      
      

    } else {
      alert("We couldn't get your location");
      this.props.destroyUser();
    }
  }

  //destroy watch position
  componentWillUnmount() {
    this.watcher.remove();
  }

  markerClicked = (queueInfo) => {
    this.setState({queueClicked: !this.state.queueClicked});
    this.setState({currentQueue: queueInfo});
  }

  joinQueue = () => {
    this.props.joinQueue(this.state.currentQueue.id,this.props.user.uid, this.state.region, this.state.city, this.props.navigation.navigate('QueueScreen'));
  }


  //called when we physically move on map
  onNewPosition = (position: Position) => {
    //animate the map to track your movements away from mapview
    //set coordinates in redux, no action for this as of now
    this.props.updateCoords({latitude: position.coords.latitude, longitude: position.coords.longitude})
    this.checkQueueCreationAbility(this.props.user.location.latitude, this.props.user.location.longitude)
  }


  //this function checks to see if a user can create a queue at their current location
  // if they are too close to another queue, it will fail
  checkQueueCreationAbility = (latitude, longitude) => {
    //set availability = not null
    let availability = !!this.props.renderRegions

    //if availability not null (= [] or [1,2,3])
    if(availability) {
      this.props.renderRegions.forEach((region) => {
        const roundedLat = Math.round((region.coords.latitude*1000))/1000
        const roundedLong = Math.round((region.coords.longitude*1000))/1000
        const userPropsRoundedLat = Math.round((latitude*1000))/1000
        const userPropsRoundedLong = Math.round((longitude*1000))/1000
        if((roundedLat == userPropsRoundedLat) && (roundedLong == userPropsRoundedLong)) {
          availability = false
        } 
      })
    }
  
    if(availability != this.state.canCreateQueueAtLocation) {
      this.setState({
        canCreateQueueAtLocation: availability
      })
    }
  }



  //this could contain bugs, we are setting the redux state of our user to initial state if they click back button
  handleBackButtonClicked = () => {
    this.props.destroyUser();
    this.props.navigation.navigate('HomeScreen');
  }

  //when you scroll away or zoom out this function is called
  handleMapViewChange = (event) => {
    //we will save the information about our map in redux
    //redux setting the state of all of these map attributes
    const {latitude, longitude, latitudeDelta, longitudeDelta} = event.nativeEvent.region;

    this.props.updateMap({
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta
    })
  }

  //this is where the queues are physically mapped to our UI from redux
  renderRelevantQueues = () => {
    //if there are no redux regions just return null
    if(!this.props.renderRegions) {
      return null
    } 
    else if(this.props.renderRegions.length == 0) {
      return null
    }


    //set create queue at location svg color if they are too close to a marker
    [latitude, longitude] = [this.props.user.location.latitude, this.props.user.location.longitude]    
    this.checkQueueCreationAbility(latitude, longitude)

    let iterator = 0;
    //going to need to add other fields to the render regions
    return this.props.renderRegions.map(point => (
      <View key={iterator++}>
        <MapView.Marker
          coordinate={point.coords}
          //title={point.id}
          pinColor={"#4CFF4F"}
          opacity={0.5}
          onPress={() => this.markerClicked(point)}
        />
        <MapView.Circle
          center={point.coords}
          radius={point.radius}
          strokeWidth = { 1 }
          strokeColor = { '#1a66ff' }
          fillColor = { 'rgba(63, 63, 191, 0.26)' }
        />
      </View>
    ))
  }


  //this function decides whether or not to render the little return to home
  //target svg 
  renderReturnToCurrentLocationSvg = () => {
    //basically, if the map redux doesnt match the position redux, we have the button
    //round to four decimals
    const roundedLat = Math.round((this.props.reduxMap.latitude*500))/500
    const roundedLong = Math.round((this.props.reduxMap.longitude*500))/500
    const userPropsRoundedLat = Math.round((this.props.user.location.latitude*500))/500
    const userPropsRoundedLong = Math.round((this.props.user.location.longitude*500))/500
    

    if((roundedLat != userPropsRoundedLat) || (roundedLong != userPropsRoundedLong)) {
      return (
        <Text style={styles.returnToHome} onPress={this.snapMapViewToUser} >Return to home</Text>
      )
    } 
    return null
  }



   createQueueClicked = async () => {  
     //if the user cannot create a queue, just return
    if(!this.state.canCreateQueueAtLocation) {
      return
    }
    //if logged into spotify this is different
    [latitude, longitude] = [this.props.user.location.latitude, this.props.user.location.longitude]
    try {

      //NEED TO MAKE THIS ASYNC
      this.setState({addingQueueForm: true});

      const strLoc =  await Location.reverseGeocodeAsync({ latitude, longitude })

      this.setState({
        region: strLoc[0].region,
        city: strLoc[0].city,
      })

    } catch(error) {
      console.log("error getting new geocode")
    }
  }

  markerClickedPopup = () => {
    if(this.state.queueClicked){
      let objIndex = this.props.renderRegions.findIndex((obj => obj.id == this.state.currentQueue.id));
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
            onPress={() => this.joinQueue()}
          >
            <Text style={styles.joinButtonText}>Join</Text>
          </TouchableOpacity>
        </View>
      )
    }else if(this.state.addingQueueForm){
      //the name will be from a form and current song somewhere else but this will be changed
      return (
        <View>
          <TextInput
            style={styles.inputQueueNameAndSong}
            enablesReturnKeyAutomatically={true}
            selectTextOnFocus={true}
            placeholder="Insert Queue Name"
            onChangeText={(insertQueueName) => this.setState({insertQueueName})}
            value={this.state.insertQueueName}
          />
          <TextInput
            style={styles.inputQueueNameAndSong}
            enablesReturnKeyAutomatically={true}
            selectTextOnFocus={true}
            onChangeText={(insertCurrSong) => this.setState({insertCurrSong})}
            placeholder="Insert Current Song"
            value={this.state.insertCurrSong}
          />
          <TouchableOpacity
            style={styles.joinButton}
            onPress={() =>  this.submitNewQueueAndClose()}
          >
            <Text style={styles.joinButtonText}>Done</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.joinButton}
            onPress={() => this.setState({addingQueueForm:false})}
          >
            <Text style={styles.joinButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      )
    }else{
      return (
          <NewQueueSvg canCreateQueueAtLocation={this.state.canCreateQueueAtLocation} createQueueClicked={() => this.createQueueClicked()}/>
      );
    }
  }

  submitNewQueueAndClose = () => {
    this.props.createQueue(this.props.user.location, 100, this.props.user.uid, this.state.region, this.state.city, this.state.insertQueueName, this.state.insertCurrSong);
    this.setState({addingQueueForm:false});
  }

  addQueueForm = () => {
    if(this.state.addingQueueForm){
      return (
        <View>
          <Text>Adding Queue Info</Text>
          <Button
            onPress={() => this.setState({addingQueueForm: false})}
            title="Close"
            color="#841584"
          />
        </View>
      )
    }else{
      return
    }
  }




  render() {
    const { ready } = this.state;
    if(!ready) {
      return (
        <View style={styles.container}>
          <Text style={styles.loadingTxt}>Loading Maps...</Text>
        </View>
      );
    } else {
      return (
        <SafeAreaView style={{flex: 1, backgroundColor: HOMESCREEN_BACKGROUND}}>
          <View style={styles.container}>
            <StatusBar backgroundColor="blue" barStyle="light-content" />
            <View style={styles.topBar}>
                <Text style={styles.cityText}>
                    {this.state.city}, {this.state.region}
                </Text>
                  <TouchableOpacity
                    class="float-right"
                    style={styles.settingsButton}
                    onPress={() => this.props.navigation.navigate('Settings')}>
                      <Text style={styles.joinButtonText}>Settings</Text>
                  </TouchableOpacity>
                <Text style={styles.usernameText}>
                  {this.props.user.uid}
                </Text>
            </View>
            <View style={styles.mapContainer}>
              <MapView 
                  ref={this.map}
                  style={styles.map}  provider="google" customMapStyle={NIGHT_MAP_STYLE}
                  initialRegion={{
                    latitude: this.props.reduxMap.latitude,
                    longitude: this.props.reduxMap.longitude,
                    latitudeDelta: this.props.reduxMap.latitudeDelta,
                    longitudeDelta: this.props.reduxMap.longitudeDelta,
                  }}
                  showsCompass={true}
                  showsScale={true}
                  showsUserLocation={true}
                  showsMyLocationButton={true}
                  onChange={(event) => this.handleMapViewChange(event)}
                  >             
                {this.renderRelevantQueues()}
              </MapView>
              {/* <View style={styles.createAndCenterView}>
                <Text style={styles.createQueue} onPress={this.createQueue} >Create</Text>
              </View> */}
            </View>
              {this.markerClickedPopup()}
            <View style={styles.bottomBar}>
                <Text style={styles.backText} onPress={() => this.handleBackButtonClicked()}>
                    Back  
                </Text>
            </View>
          </View>
        </SafeAreaView>
      );
    }
  }
}


//Redux setup

//mapStateToProps
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
  //since we have multiple reducers, we need to reference our user reducer
  
  return {
    destroyUser: () => dispatch(destroyUser()),
    updateCoords: (coords) => dispatch(updateCoords(coords)),
    updateMap: (mapData) => dispatch(updateMap(mapData)),
    createQueue: (coords, radius, hostname, region, city, name, currentSong) => dispatch(createQueue(coords, radius, hostname, region, city, name, currentSong)),
    getQueuesByCity: (region, city) => dispatch(getQueuesByCity(region, city)),
    joinQueue: (queueId, userId, region, city, nextFunc) => dispatch(joinQueue(queueId, userId, region, city, nextFunc))
  }
}

export default connect(msp, mdp)(MapScreen)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HOMESCREEN_BACKGROUND
  },
  topBar: {
    height: 200,
    backgroundColor: HOMESCREEN_BACKGROUND,
  },
  mapContainer: {
    flex: 1
  },
  map: {
    flex: 1,
  },
  returnToHome: {
    color: 'white',
    fontSize: 30,
    marginLeft: '30%'
  },
  createAndCenterView: {
    position: 'absolute',
    bottom: 0
  },
  createQueue: {
    color: 'white',
    fontSize: 30,
    marginLeft: '50%',
  },
  loadingTxt: {
    textAlign: 'center', // <-- the magic
    fontSize: 18,
    marginTop: "100%",
    marginLeft: "25%",
    width: 200
  },
  topBar: {
    height: '10%',
    backgroundColor: HOMESCREEN_BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 1
  },
  bottomBar: {
    height: '10%',
    backgroundColor:  HOMESCREEN_BACKGROUND,
    flexDirection: 'row',
    borderTopColor: 'grey',
    borderTopWidth: 1,
  },
  backText: {
    color: 'white',
    fontSize: 30,
    marginLeft: 0
  },
  cityText: {
    color: 'white',
    fontSize: 30,
  },
  usernameText: {
    color: 'grey'
  },
  moreQueueInfo: {
    flex: 1,
    backgroundColor: 'white',
    height: 10,
  },
  joinButton: {
    backgroundColor: '#1c06e2',
    alignItems: 'center',
    padding: 10,
    margin:10,
    borderRadius:10,
  },
  settingsButton: {
    backgroundColor: '#1c06e2',
    alignItems: 'center',
    height:15,
    margin: 5,
    borderRadius:10,
    alignSelf:"flex-end",
  },
  joinButtonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight:'bold',
    fontSize: 12
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
  inputQueueNameAndSong: {
    height: 50, 
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
    margin: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  }
});
