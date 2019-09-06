import { db } from '../../FirebaseConfig';
import firebase from 'firebase';
import 'firebase/firestore';

export const loginGuestUser = () => {
    return firebase.auth().signInAnonymously();
}

export const addUserToQueue = (queueId, userId, region, city) => {
    return new Promise(function(resolve, reject) {
        addUserToContributors(queueId, userId).then((res) => {
            getQueueLocationDoc(region, city, queueId).then((res) => {
                newNumMembers = res.data().numMembers +1;
                updateQueueNumMembers(region, city, queueId, newNumMembers).then((res) => {
                    resolve("User joined queue successfully");
                }).catch((err) => {
                    reject(Error("Update numMembers failed"))
                })
            }).catch((err) => {
                reject(Error("Get queue location doc failed"))
            })
        }).catch((err) => {
            reject(Error("Add users to contributors failed"))
        })
    });
}

const addUserToContributors = (queueId, userId) => {
    return db.collection('queueContributors').doc(queueId).collection('users').add({
        userId
    })
}

const getQueueLocationDoc = (region, city, queueId) => {
    return db.collection('queueLocation').doc(region).collection(city).doc(queueId).get()
}

const updateQueueNumMembers = (region, city, queueId, newNumMembers) => {
    return db.collection('queueLocation').doc(region).collection(city).doc(queueId).update({
        numMembers: newNumMembers,
    })
}

export const startQueue = (coords, radius=100, hostname, region, city, name) => {
    return new Promise(function(resolve, reject) {
        postQueue(coords, radius=100, region, city, name).then((res) => {
            queueId = res.id;
            postQueueContributors(hostname, queueId).then((res) => {
                updateHost(hostname, queueId).then((res) => {
                    resolve("Queue started successfully")
                }).catch((err) => {
                    reject(Error("Host add failed"))
                })
            }).catch((err) => {
                reject(Error("Contributor post failed"))
            })
        }).catch((err) => {
            reject(Error("Post queue failed"))
        })
    })
}

const postQueue = (coords, radius=100, region, city, name) => {
    return db.collection('queueLocation').doc(region).collection(city).add({
        coords: new firebase.firestore.GeoPoint(coords.latitude, coords.longitude),
        radius: radius,
        numMembers: 1,
        name: name,
        currentSong: 'empty',
    })
}

const postQueueContributors = (hostname, queueId) => {
    return db.collection('queueContributors').doc(queueId).collection('users').doc(hostname).set({
        numVotes: 0
    })
}

export const updateHost = (hostname, queueId) => {
    return db.collection('queueContributors').doc(queueId).set({
        hostId: hostname
    })
}

export const destroyQueue = (region, city, queueId) => {
    return new Promise(function(resolve, reject) {
        deleteQueueLocation(region, city, queueId).then((res) => {
            deleteQueueContributors(queueId).then((res) => {
                resolve("Destroyed queue successfully")
            }).catch((err) => {
                reject(Error("Delete queue contributors failed"))
            })
        }).catch((err) => {
            reject(Error("Delete queue location failed"))
        })
    })
}

const deleteQueueLocation = (region, city, queueId) => {
    return db.collection('queueLocation').doc(region).collection(city).doc(queueId).delete()
}

const deleteQueueContributors = (queueId) => {
    return db.collection('queueContributors').doc(queueId).delete()
}

export const locationsInCity = (region, city) => {
    return db.collection('queueLocation').doc(region).collection(city)
}

export const decodeLocationQueues = (querySnapshot) => {
    let positionArry = []
    querySnapshot.forEach((doc) => {
        positionArry.push({
            id: doc.id,
            coords: {
                latitude: doc.data().coords._lat,
                longitude: doc.data().coords._long
            },
            radius: doc.data().radius,
            numMembers: doc.data().numMembers,
            currentSong: doc.data().currentSong,
            name: doc.data().name
        })
    })
    return positionArry;
}
