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

import { DEFAULT_LATITUDE_DELTA, DEFAULT_LONGITUDE_DELTA } from '../../constants/map-constants';
const defaultState = {
    // this.map in frontend will somewhat mirror this 
    //default to san francisco
    reduxMap: {
        latitude: 122.4194,
        longitude: 37.7749,
        latitudeDelta: DEFAULT_LATITUDE_DELTA,
        longitudeDelta: DEFAULT_LONGITUDE_DELTA
    },
    geofenceRegions: [
    ],
    //TBD these will be fetched based on reduxMap delta values (most likely)
    renderRegions: null
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
        case "GET_QUEUES_BY_CITY":
            return {
                ...state,
                renderRegions: action.payload
            }
        case "ADD_QUEUE_TO_MAP":
            let tempState = state.renderRegions ? state.renderRegions : []
            tempState.push({
                id: action.payload.id,
                coords: {
                    latitude: action.payload.coords.latitude,
                    longitude: action.payload.coords.longitude
                },
                radius: action.payload.radius,
                numMembers: 1
            })
            //we also need to trigger the map to re render
            return {
                ...state,
                renderRegions: tempState,
                reduxMap: {
                    latitude: state.reduxMap.latitude,
                    longitude: state.reduxMap.longitude,
                    latitudeDelta: state.reduxMap.latitudeDelta + 0.00001,
                    longitudeDelta: state.reduxMap.longitudeDelta
                }
            }
        default: 
            return state
    }
}
