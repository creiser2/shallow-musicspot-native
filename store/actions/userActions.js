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


export const destroyUser = () => {
    //firebase call to remove anonymous user?
    return(dispatch) => {
        dispatch({type: 'DESTROY_USER'})
    }
};