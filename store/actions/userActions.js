
import { showInternetWarning } from '../../src/components/common/CustomToast'
import { 
    loginGuestUser,
    addUserToQueue,
    removeUserFromQueue,
} from '../../src/api/FirebaseSession'
import {
    watcherWithHandler,
} from '../../src/api/LocationSession'

//we can therefore halt the dispatch until our db call
export const addGuest = () => {
    return (dispatch) => {
        loginGuestUser().then((res) => {
            let uid = res.user.uid
            dispatch({type: 'MAKE_GUEST', payload: uid})
        }).catch((err) => {
            dispatch({type: 'MAKE_GUEST_ERROR'})
            showInternetWarning()
        })
    }
};

//maybe? do a new dispatch to update important regions on this
export const updateCoords = (position) => {
    return (dispatch) => {
        dispatch({type: "UPDATE_COORDS", payload: {longitude: position.coords.longitude, latitude: position.coords.latitude}})
    }
}

export const setSpotifyToken = (token) => {
    return (dispatch) => {
        dispatch({type: "SET_SPOTIFY_TOKEN", payload: token})
    }
}


export const leaveQueue = (queueId, userId) => {
    return (dispatch) => {
        removeUserFromQueue(queueId, userId).then((res) => {
            dispatch({type: "LEAVE_QUEUE", payload: queueId})
        }).catch((err) => {
            showInternetWarning()
        })
        
    }
}

//firebase call to remove anonymous user?
export const destroyUser = () => {
    return(dispatch) => {
        dispatch({type: 'DESTROY_USER'})
    }
};