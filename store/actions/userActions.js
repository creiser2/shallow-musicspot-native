
import { 
    loginGuestUser,
    addUserToQueue,
    getQueueLocationDoc,
    updateQueueNumMembers
} from '../../src/api/FirebaseSession'
import {
    watcherWithHandler,
    getCurrentLocation,
    getGeoCode,
} from '../../src/api/LocationSession'

//dispatch will send action to reducer
//we can therefore halt the dispatch until our db call
export const addGuest = () => {
    return (dispatch) => {
        loginGuestUser().then((res) => {
            let uid = res.user.uid
            dispatch({type: 'MAKE_GUEST', payload: uid})
        }).catch((err) => {
            dispatch({type: 'MAKE_GUEST_ERROR'})
        })
    }
};

//maybe? do a new dispatch to update important regions on this
export const updateCoords = () => {
    return (dispatch) => {
        const onNewPosition = (position: Position) => {
            dispatch({type: "UPDATE_COORDS", payload: {longitude: position.coords.longitude, latitude: position.coords.latitude}})
        }
        watcherWithHandler(onNewPosition).remove()
    }
}

export const updateGeoCode = (city, region) => {
    return (dispatch) => {
        dispatch({type: "UPDATE_GEOCODE", payload: {city: city, region: region}})
    }
}

//user id gets added to the user list, and changes the page to the new queue page
export const joinQueue = (queueId, userId, region, city, nextFunc) => {
    return (dispatch) => {
        addUserToQueue(queueId, userId, region, city).then((res) => {
            dispatch({type: "JOIN_QUEUE", payload: queueId})
        }).catch((err) => {

        })
    }
}

//firebase call to remove anonymous user?
export const destroyUser = () => {
    return(dispatch) => {
        dispatch({type: 'DESTROY_USER'})
    }
};

export const endWatcher = () => {
    
}



export const getPositionOnce = async () => {
    const location = await getCurrentLocation()
    const strLoc = await getGeoCode(location.coords.longitude, location.coords.latitude)
    updateCoords({latitude: location.coords.latitude, longitude: location.coords.longitude})
    updateGeoCode({city: strLoc[0].city, region: strLoc[0].region})
    console.log("trying to call dispatch funcs")
    //this.checkQueueCreationAbility(this.props.user.location.latitude, this.props.user.location.longitude)
}