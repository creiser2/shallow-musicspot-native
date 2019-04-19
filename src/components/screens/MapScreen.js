import React, { Component } from 'react';
import { Permissions, Location, MapView } from 'expo';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native';
import {DAY_MAP_STYLE, NIGHT_MAP_STYLE} from '../../../constants/mapstyles';
import {HOMESCREEN_BACKGROUND} from '../../../constants/colors';
import { destroyUser } from '../../../store/actions/userActions';


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
  longitude: number,
  physicalState: string,
  city: string
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



class MapScreen extends Component<{}, AppState> {
  state = {
    ready: false,
    longitude: null,
    latitude: null,
    region: "",
    city: "",
  }


  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync();
      //get city and state
      const strLoc =  await Location.reverseGeocodeAsync({ latitude, longitude })
      this.setState({ ready: true, city: strLoc[0].city, region: strLoc[0].region, longitude, latitude });
    } else {
      alert("We couldn't get your location");
      this.props.destroyUser();
    }
  }


  handleBackButtonClicked = () => {
    this.props.destroyUser();
    this.props.navigation.navigate('HomeScreen');
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
                <Text style={styles.cityText}>
                    {this.state.city}, {this.state.region}
                </Text>
                <Text style={styles.usernameText}>
                  {this.props.user.uid}
                </Text>
            </View>
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
                coordinate={{latitude: latitude - 0.002,  longitude: longitude}}
                title={this.props.isGuest.toString()}
                description={"great job"}
                opacity={0.5}
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
  },
  cityText: {
    color: 'white',
    fontSize: 30,
  },
  usernameText: {
    color: 'grey'
  }
});
