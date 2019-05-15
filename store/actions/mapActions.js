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


export const createQueue = (coords, radius=100, hostname, region, city) => {
    return (dispatch) => {
        //add queuelocation table
        db.collection('queueLocation').doc(region).collection(city).add({
            coords: new firebase.firestore.GeoPoint(coords.latitude, coords.longitude),
            radius: radius,
            numMembers: 1,
            name: "default-queue",
            currentSong: ""
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
            //optimistically render the queue you just created
            dispatch({type: "ADD_QUEUE_TO_MAP", payload: {id: res.id, coords: coords, radius: radius}})
        }).catch((err) => {
            console.log("collection add failed")
        })
    }
}

//delete a queue
export const deleteQueue = (queueId, region, city) => {
    return (dispatch) => {
        //add queuelocation table
        db.collection('queueLocation').doc(region).collection(city).doc(queueId).delete()
        .then((res) => {
        /*  db.collection('queueVotes').doc(queueId).delete()
            .catch((err) => {
                console.log("deleting queue / queueVotes failed")
            }) */

            //optimistically render the queue you just deleted
            console.log("dispatching")
            dispatch({type: "DELETE_QUEUE", payload: {id: queueId}})
        }).catch((err) => {
            console.log("queue delete failed")
        })
    }
}

//Get the queue
export const getQueuesByCity = (region="anonymous", city="anonymous") => {
    return (dispatch) => {
        db.collection('queueLocation').doc(region).collection(city).onSnapshot(function(querySnapshot) {
            let positionArry = []
            querySnapshot.forEach((doc) => {
                positionArry.push({
                    id: doc.id,
                    coords: {
                        latitude: doc.data().coords._lat,
                        longitude: doc.data().coords._long
                    },
                    radius: doc.data().radius,
                    numMembers: doc.data().numMembers
                })
            })
            dispatch({type: "GET_QUEUES_BY_CITY", payload: positionArry})
        }, function(error) {
            console.log("ERROR! getting queues!")
        });
        
        
        // db.collection('queueLocation').doc(region).collection(city).get().then((querySnapshot) => {
        //     let positionArry = []
        //     querySnapshot.forEach((doc) => {
        //         positionArry.push({
        //             id: doc.id,
        //             coords: {
        //                 latitude: doc.data().coords._lat,
        //                 longitude: doc.data().coords._long
        //             },
        //             radius: doc.data().radius,
        //             numMembers: doc.data().numMembers
        //         })
        //     })
        // }).then(() => {
        //     dispatch({type: "GET_QUEUES_BY_CITY", payload: positionArry})
        // }).catch((err) => {
        //     console.log("city does not exist")
        // })
    }
}
