import { db } from '../../FirebaseConfig';
import firebase from 'firebase';
//import console = require('console');

export const loginGuestUser = () => {
    return firebase.auth().signInAnonymously();
}

export const addUserToQueue = (queueId, userId, region, city) => {
    return new Promise(function(resolve, reject) {
        addUserToContributors(queueId, userId).then((res) => {
            getQueueLocationDoc(region, city, queueId).then((res) => {
                newNumMembers = res.data().numMembers +1;
                updateQueueNumMembers(region, city, queueId, newNumMembers).then((res) => {
                    resolve("Promise resolved successfully");
                }).catch((err) => {
                    reject(Error("Promise rejected"))
                })
            }).catch((err) => {
                reject(Error("Promise rejected"))
            })
        }).catch((err) => {
            reject(Error("Promise rejected"))
        })
    });
}

const addUserToContributors = (queueId, userId) => {
    return db.collection('queueContributors').doc(queueId).collection('users').add({
        userId
    })
}

export const getQueueLocationDoc = (region, city, queueId) => {
    return db.collection('queueLocation').doc(region).collection(city).doc(queueId).get()
}

export const updateQueueNumMembers = (region, city, queueId, newNumMembers) => {
    return db.collection('queueLocation').doc(region).collection(city).doc(queueId).update({
        numMembers: newNumMembers
    })
}