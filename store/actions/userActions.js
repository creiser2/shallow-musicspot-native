import { db } from '../../FirebaseConfig';
import firebase from 'firebase';
import { 
    loginGuestUser,
    addUserToQueue,
    getQueueLocationDoc,
    updateQueueNumMembers
} from '../../src/api/FirebaseSession'

export const addGuest = () => {
    //dispatch will send action to reducer
    //we can therefore halt the dispatch until our db call
    return (dispatch) => {
        loginGuestUser().then((res) => {
            let uid = res.user.uid
            dispatch({type: 'MAKE_GUEST', payload: uid})
        }).catch((err) => {
            dispatch({type: 'MAKE_GUEST_ERROR'})
        })
    }
};


export const updateCoords = (coords) => {
    //maybe? do a new dispatch to update important regions on this
    return (dispatch) => {
        dispatch({type: "UPDATE_COORDS", payload: coords})
    }
}

//user id gets added to the user list, and changes the page to the new queue page
export const joinQueue = (queueId, userId, region, city, nextFunc) => {
    return (dispatch) => {

        addUserToQueue(queueId, userId, region, city).then((res) => {
            dispatch({type: "JOIN_QUEUE", payload: queueId})
        }).catch((err) => {
            console.log("Join/add user failed.");
        })

    }
}


export const destroyUser = () => {
    //firebase call to remove anonymous user?
    return(dispatch) => {
        dispatch({type: 'DESTROY_USER'})
    }
};