import { db } from '../../FirebaseConfig';
import firebase from 'firebase';
import 'firebase/firestore';

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


export const createQueue = (coords, radius=100, hostname) => {

    return (dispatch) => {
        //add queuelocation table
        db.collection('queueLocation').add({
            coords: new firebase.firestore.GeoPoint(coords.latitude, coords.longitude),
            radius: radius,
            numMembers: 1
        }).then((res) => {
            db.collection('queueContributors').doc(res.id).collection('users').doc(hostname).set({
                numVotes: 0
            }).catch((err) => {
                console.log("add host / queueContributors failed")
            })

            db.collection('queueContributors').doc(res.id).set({
                hostId: hostname
            })
            dispatch({type: "CREATE_QUEUE", payload: {id: res.id}})
        }).catch((err) => {
            console.log("collection add failed")
        })
    }
}