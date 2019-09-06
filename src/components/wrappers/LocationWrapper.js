//npm run debug will give redux devtools pop up to view and manage state
import React, { Component } from 'react';
import { connect } from 'react-redux';

//navigation
import AppNavigator from '../AppNavigator';

//when someone figures out how to configure these devtools
import { Permissions, Location } from 'expo';

import { destroyUser, updateCoords, joinQueue } from '../../../store/actions/userActions';


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

class LocationWrapper extends Component {
  state = {
    ready: false,
    region: "",
    city: "",
  };  

  watcher: { remove: () => void };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      //get initial location to render in map, this will be later updated by our watcher
      const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync();
      //get city and region/state
      const strLoc =  await Location.reverseGeocodeAsync({ latitude, longitude })

      //snap map to user location
      // this.props.updateMap({latitude, longitude, latitudeDelta: DEFAULT_LATITUDE_DELTA, longitudeDelta: DEFAULT_LONGITUDE_DELTA})
      
      //update in redux the user position
      // this.props.updateCoords({latitude, longitude})
      this.setState({ ready: true, city: strLoc[0].city, region: strLoc[0].region });
      
      //start watching position
      const options = { enableHighAccuracy: true, timeInterval: 1000, distanceInterval: 1 };
      
      //get all cities based on city and region      
      //the onNewPosition function will be called for each new position captured after 1 second
      this.watcher = await Location.watchPositionAsync(options, this.onNewPosition); 
    } else {
      //TODO: predicted exploit - if this destroys guest user before its created
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
    //set coordinates in redux, no action for this as of now
    this.props.updateCoords({latitude: position.coords.latitude, longitude: position.coords.longitude})
  }

  render() {
    return (
        <AppNavigator/>
    );
  }
}

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
    updateCoords: (coords) => dispatch(updateCoords(coords))
  }
}


export default connect(msp, mdp)(LocationWrapper)
