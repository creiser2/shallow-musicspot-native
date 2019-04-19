import React, { Component } from 'react';
import { Permissions, Location, MapView, TaskManager } from 'expo';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native';
import {DAY_MAP_STYLE, NIGHT_MAP_STYLE} from '../../../constants/mapstyles';
import {HOMESCREEN_BACKGROUND} from '../../../constants/colors';
import { destroyUser } from '../../../store/actions/userActions';


import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar
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
    longitude: null,
    latitude: null,
    region: "",
    city: "",
  };  


  //to remove our watcher, for now we do not want to keep watching location after the component unmounts, but this will change later
  watcher: { remove: () => void };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {

      //get initial location to render in map, this will be later updated by our watcher
      const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync();
      //get city and state
      const strLoc =  await Location.reverseGeocodeAsync({ latitude, longitude })
      this.setState({ ready: true, city: strLoc[0].city, region: strLoc[0].region, longitude, latitude });

      //start watching position
      const options = { enableHighAccuracy: true, timeInterval: 1000, distanceInterval: 1 };

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

 

  //called when we physically move on map
  onNewPosition = (position: Position) => {
    //animate the map to track your movements away from mapview
    this.map.current.animateToCoordinate(position.coords, 1000);
    //set the state of the application
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }


  //this could contain bugs, we are setting the redux state of our user to initial state if they click back button
  handleBackButtonClicked = () => {
    this.props.destroyUser();
    this.props.navigation.navigate('HomeScreen');
  }

  onPress = async () => {
    //begin geofencing based on current regions
    //These regions will be stored in redux, and we will fetch them with an action such as "GET_REGIONS"
    //For now we will apply this to our test region
    const regions = [
      {
        latitude: 45.886834, 
        longitude: 5.124,
        radius: 100,
        notifyOnEnter: true,
        notifyOnExit: true
      }
    ]

    // //we are basically checking to see if our location is in one of the above regions
    await Location.startGeofencingAsync("HANDLE_REGION", regions)
  }


  render() {
    const { ready, longitude, latitude } = this.state;
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
                <Text onPress={this.onPress} style={styles.cityText}>
                    {this.state.city}, {this.state.region}
                </Text>
                <Text style={styles.usernameText}>
                  {this.props.user.uid}
                </Text>
            </View>
            <MapView 
                ref={this.map}
                style={styles.map}  provider="google" customMapStyle={NIGHT_MAP_STYLE}
                initialRegion={{
                latitude,
                longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.001,
              }}
              showsScale={true}
              showsUserLocation={true}
            > 
              <MapView.Marker
                coordinate={{latitude: 45.886834,  longitude: longitude}}
                title={this.props.isGuest.toString()}
                description={"great job"}
                opacity={0.5}
                pinColor={"#4CFF4F"}
              />
              <MapView.Circle
                center = {{latitude: 45.886834,  longitude: longitude} }
                radius = { 100 }
                strokeWidth = { 1 }
                strokeColor = { '#1a66ff' }
                fillColor = { 'rgba(63, 63, 191, 0.26)' }
              />
            </MapView>
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

TaskManager.defineTask("HANDLE_REGION", ({ data: { eventType, region }, error }) => {
  if (error) {
    // Error occurred - check `error.message` for more details.
    return;
  }
	if (eventType === Location.GeofencingEventType.Enter) {
		console.log("entered");
	} else if (eventType === Location.GeofencingEventType.Exit) {
	  console.log("exited");
	}
});

//Redux setup

//mapStateToProps
const msp = (state) => {
  //since we have multiple reducers, we need to reference our user reducer
  const userState = state.user
  return {
    ...userState
  }
}

//mapDispatchToProps
const mdp = (dispatch) => { 
  //since we have multiple reducers, we need to reference our user reducer
  
  return {
    destroyUser: () => dispatch(destroyUser())
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
  map: {
    flex: 1,
    flexDirection: 'column'
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
    borderTopColor: 'grey',
    borderTopWidth: 1,
    justifyContent: 'center',
  },
  backText: {
    color: 'white',
    marginLeft: 20,
    fontSize: 30
  },
  cityText: {
    color: 'white',
    fontSize: 30,
  },
  usernameText: {
    color: 'grey'
  }
});
