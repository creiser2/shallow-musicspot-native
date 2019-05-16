import { db } from '../../FirebaseConfig';
import firebase from 'firebase';

export const addGuest = () => {
    //dispatch will send action to reducer
    //we can therefore halt the dispatch until our db call
    return (dispatch) => {
        firebase.auth().signInAnonymously().then((res) => {
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
        db.collection('queueContributors').doc(queueId).collection('users').add({
            userId
        }).then((res)=> {
            console.log('add user worked');
            db.collection('queueLocation').doc(region).collection(city).doc(queueId).get()
            .then((res) => {
                newNumMembers = res.data().numMembers +1;
                console.log("getQueue worked")
                db.collection('queueLocation').doc(region).collection(city).doc(queueId).update({
                    numMembers: newNumMembers
                }).then((res) => {
                    console.log("update numMembers worked");
                    //should pass the number of members here as the payload but action doesnt have that as a state
                    dispatch({type: "JOIN_QUEUE"})
                 }).catch((err) => {
                    console.log("updating numUsers failed");
                 })
            }).catch((err) => {
                console.log("Getting queue to update failed");
            })
        }).catch((err)=>{
            console.log("join/add user failed");
        })
    }
}


export const destroyUser = () => {
    //firebase call to remove anonymous user?
    return(dispatch) => {
        dispatch({type: 'DESTROY_USER'})
    }
};