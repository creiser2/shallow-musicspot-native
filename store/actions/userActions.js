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


export const destroyUser = () => {
    //firebase call to remove anonymous user?
    return(dispatch) => {
        dispatch({type: 'DESTROY_USER'})
    }
};