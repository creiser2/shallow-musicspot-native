
import { showInternetWarning } from '../../src/components/common/CustomToast'
import { 
    loginGuestUser,
    addUserToQueue,
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

//user id gets added to the user list, and changes the page to the new queue page
export const joinQueue = (queueId, userId, nextFunc) => {
    return (dispatch) => {
        addUserToQueue(queueId, userId).then((res) => {
            dispatch({type: "JOIN_QUEUE", payload: queueId})
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