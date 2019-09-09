import React, { Component } from 'react';
import { MapView } from 'expo';

import {
    AppRegistry,
    StyleSheet, 
    TouchableOpacity,
    Text,
    View,
  } from 'react-native'

  import {DAY_MAP_STYLE, NIGHT_MAP_STYLE} from '../../../constants/mapstyles';

class QueueMapView extends Component {
    
    render() {
        return (
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
                  onChange={(event) => this.props.handleMapViewChange(event)}
                  >             
                {this.renderRelevantQueues()}
              </MapView>
              {/* <View style={styles.createAndCenterView}>
                <Text style={styles.createQueue} onPress={this.createQueue} >Create</Text>
              </View> */}
            </View>
        )
    }

  renderRelevantQueues = () => {
    if(!this.props.renderRegions) {
      return null
    } 
    else if(this.props.renderRegions.length == 0) {
      return null
    }
    // Set create queue at location svg color
    [latitude, longitude] = [this.props.user.location.latitude, this.props.user.location.longitude]    
    this.props.checkQueueCreationAbility(latitude, longitude)

    let iterator = 0;
    return this.props.renderRegions.map(point => (
      <View key={iterator++}>
        <MapView.Marker
          coordinate={point.coords}
          //title={point.id}
          pinColor={"#4CFF4F"}
          opacity={0.5}
          onPress={() => this.props.markerClicked(point)}
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
}

const styles = StyleSheet.create({
    mapContainer: {
        flex: 1
    },
    map: {
        flex: 1,
    },
});

export default QueueMapView;