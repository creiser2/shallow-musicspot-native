import { db } from '../../FirebaseConfig';
import firebase from 'firebase';

/*
    -This action is tied to all updates on the mapview
        so if the user zooms out, this reflects that,
    -Now, we can access the DB and update what stuff
        we are rendering
*/
export const updateMap = (mapData) => {
    
    return (dispatch) => {
        dispatch({type: "UPDATE_REDUX_MAP", payload: mapData})
    }
}