//in this reducer we are dealing with the mapstate only
/*
Storing this information will do a couple things for us
    1. When user goes to a queueview and back to map, 
        they will be able to return to whatever zoom on the map they were at and location
    2. If we store 'regions/pin and radius locations' here, we can render them and geofence them in our MapScreen
        this will allow us to have an active record of what stuff were geofencing vs what we are just plain rendering
    3. Actions for changing mapzoom will enable triggering from DB,
        here we will need to update our regions
    
*/
const defaultState = {
    // this.map in frontend will somewhat mirror this 
    //default to san francisco
    reduxMap: {
        latitude: 37.773972,
        longitude: -122.431297,
        latitudeDelta: 0.01,
        longitudeDelta: 0.001
    },
    geofenceRegions: [
        // {
        //  latitude: null,
        //  longitude: null,
        //  radius: null,
        //  notifyOnEnter: true,
        //  notifyOnExit: true
        // }
    ],
    //TBD these will be fetched based on reduxMap delta values (most likely)
    renderRegions: [

    ]
}


//reducer is called when a dispatch is made from one of our components
//the reducer handles updating the redux state of the application
export default mapReducer = (state = defaultState, action) => {
    switch(action.type) {
       case "UPDATE_REDUX_MAP":
            return {
                ...state,
                reduxMap:   {
                    latitude: action.payload.latitude,
                    longitude: action.payload.longitude,
                    latitudeDelta: action.payload.latitudeDelta,
                    longitudeDelta: action.payload.longitudeDelta
                }
            }
        case "DESTROY_REDUX_MAP":
            return {
                defaultState
            }
        default: 
            return state
    }
}


// <MapView 
//                 ref={this.map}
//                 style={styles.map}  provider="google" customMapStyle={NIGHT_MAP_STYLE}
//                 initialRegion={{
//                 latitude: this.props.user.location.latitude,
//                 longitude: this.props.user.location.longitude,
//                 latitudeDelta: 0.01,
//                 longitudeDelta: 0.001,
//               }}
//               showsScale={true}
//               showsUserLocation={true}
//               onChange={(event) => this.handleMapViewChange(event)}
//             > 