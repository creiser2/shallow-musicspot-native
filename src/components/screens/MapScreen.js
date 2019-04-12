import * as React from 'react';
import { Permissions, Location, MapView } from 'expo';
import {DAY_MAP_STYLE, NIGHT_MAP_STYLE} from '../../../constants/mapstyles';
import {HOMESCREEN_BACKGROUND} from '../../../constants/colors';

import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  StatusBar
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
          <StatusBar backgroundColor="blue" barStyle="light-content" />
          <MapView style={styles.map}  provider="google" customMapStyle={NIGHT_MAP_STYLE}
              initialRegion={{
              latitude,
              longitude,
              latitudeDelta: 0.001,
              longitudeDelta: 0.01,
            }}
            showsScale={true}
            showsUserLocation={true}
          >
          <MapView.Marker
            coordinate={{latitude: latitude - 0.002,
            longitude: longitude}}
            title={"FOO PLACE"}
            description={"great job"}
            opacity={1}
            pinColor={"#4CFF4F"}
          />
          <MapView.Circle
            center = {{latitude: latitude - 0.002,  longitude: longitude} }
            radius = { 100 }
            strokeWidth = { 1 }
            strokeColor = { '#1a66ff' }
            fillColor = { 'rgba(63, 63, 191, 0.26)' }
          />
          <MapView.Marker
            coordinate={{latitude: latitude + 0.001,
            longitude: longitude}}
            title={"Second list"}
            description={"ok"}
            opacity={1}
            pinColor={"#000"}
          />
          <MapView.Circle
            center = {{latitude: latitude + 0.001,  longitude: longitude} }
            radius = { 100 }
            strokeWidth = { 1 }
            strokeColor = { '#fff' }
            fillColor = { 'rgba(0, 0, 0, 0.68)' }
          />
          <MapView.Marker
            coordinate={{latitude: latitude + 0.0005,
            longitude: longitude  + 0.001}}
            title={"Second list"}
            description={"ok..."}
            opacity={1}
            pinColor={"#000"}
          />
          <MapView.Circle
            center = {{latitude: latitude + 0.0005,  longitude: longitude + 0.001} }
            radius = { 100 }
            strokeWidth = { 1 }
            strokeColor = { '#fff' }
            fillColor = { 'rgba(0, 0, 0, 0.68)' }
          />
          </MapView>
          <View style={styles.bottomBar}>
              <Text style={styles.backText} onPress={() => this.props.navigation.navigate('HomeScreen')}>
                  Back
              </Text>
          </View>
        </View>
      );
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HOMESCREEN_BACKGROUND
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
    height: 200,
    height: 200,
    backgroundColor: '#292c34',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomBar: {
    height: 100,
    backgroundColor:  HOMESCREEN_BACKGROUND,
    borderTopColor: 'white',
    borderTopWidth: 1,
    justifyContent: 'center',
  },
  backText: {
    color: 'white',
    marginLeft: 20,
    fontSize: 30
  }
});
