import * as React from 'react';
import { Permissions, Location, MapView } from 'expo';

import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
} from 'react-native'


type AppState = {
  ready: boolean,
  latitude: number,
  longitude: number
}

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


export default class MapScreen extends React.Component<{}, AppState> {
  state = {
    ready: false,
  };


  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync();
      this.setState({ ready: true, longitude, latitude });
      console.log("LAT: ", this.state.latitude);
      console.log("LONG: ", this.state.longitude);
    } else {
      alert("We couldn't get your location");
    }
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
        <View style={styles.container}>
          <MapView style={styles.map}  provider="google"
              initialRegion={{
              latitude,
              longitude,
              latitudeDelta: 0.001,
              longitudeDelta: 0.01,
            }}
          />
        </View>
      );
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingTxt: {
    textAlign: 'center', // <-- the magic
    fontSize: 18,
    marginTop: "100%",
    marginLeft: "25%",
    width: 200
  },
  topBar: {
    height: 200,
    height: 200,
    backgroundColor: '#292c34',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
