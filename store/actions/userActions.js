import { db } from '../../FirebaseConfig';
import firebase from 'firebase';

export const addGuest = (nav) => {
    //dispatch will send action to reducer
    //we can therefore halt the dispatch until our db call
    console.log("\n\nWORKING\n")
    return (dispatch) => {
        firebase.auth().signInAnonymously().then(() => {
            console.log("Hello added to db")
            dispatch({type: 'MAKE_GUEST'})
            
        }).catch((err) => {
            dispatch({type: 'MAKE_GUEST_ERROR'})
        })
    }
};