import { db } from '../../FirebaseConfig';
import firebase from 'firebase';
import 'firebase/firestore';
import Song from '../customClasses/Song'

const queueLocations = db.collection('queueLocation')

const queueContributors = db.collection('queueContributors')

const queueVotes = db.collection('queueVotes')

export const loginGuestUser = () => {
    return firebase.auth().signInAnonymously();
}

export const addUserToQueue = (queueId, userId) => {
    return new Promise(function(resolve, reject) {
        addUserToContributors(queueId, userId).then((res) => {
            getQueueLocationDoc(queueId).then((res) => {
                newNumMembers = res.data().numMembers +1;
                updateQueueNumMembers(queueId, newNumMembers).then((res) => {
                    resolve("User joined queue successfully");
                }).catch((err) => {
                    reject(err)
                })
            }).catch((err) => {
                reject(err)
            })
        }).catch((err) => {
            reject(err)
        })
    });
}

export const removeUserFromQueue = (queueId, userId) => {
    return new Promise(function(resolve, reject) {
        removeUserFromContributors(queueId, userId).then((res) => {
            getQueueLocationDoc(queueId).then((res) => {
                newNumMembers = res.data().numMembers - 1;
                updateQueueNumMembers(queueId, newNumMembers).then((res) => {
                    resolve("User left queue successfully");
                }).catch((err) => {
                    reject(Error("Update numMembers failed"))
                })
            }).catch((err) => {
                reject(Error("Get queue location doc failed"))
            })
        }).catch((err) => {
            reject(Error("Delete user from contributors failed"))
        })
    });
}

const removeUserFromContributors = (queueId, userId) => {
    return queueContributors.doc(queueId).collection('users').doc(userId).delete()
}

const addUserToContributors = (queueId, userId) => {
    return queueContributors.doc(queueId).collection('users').doc(userId).set({})
}

const getQueueLocationDoc = (queueId) => {
    return queueLocations.doc(queueId).get()
}

const updateQueueNumMembers = (queueId, newNumMembers) => {
    return queueLocations.doc(queueId).set({
        numMembers: newNumMembers,
    }, { merge: true })
}

export const startQueue = (coords, radius=100, hostname, region, city, name) => {
    return new Promise(function(resolve, reject) {
        postQueue(coords, radius=100, region, city, name).then((res) => {
            queueId = res.id;
            postQueueContributors(hostname, queueId).then((res) => {
                updateHost(hostname, queueId).then((res) => {
                    resolve({id: queueId})
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
    return queueLocations.add({
        coords: new firebase.firestore.GeoPoint(coords.latitude, coords.longitude),
        radius: radius,
        numMembers: 1,
        name: name,
        currentSong: 'empty',
        region: region,
        city: city,
    })
}

const postQueueContributors = (hostname, queueId) => {
    return queueContributors.doc(queueId).collection('users').doc(hostname).set({
        numVotes: 0
    })
}

export const updateHost = (hostname, queueId) => {
    return queueContributors.doc(queueId).set({
        hostId: hostname
    })
}

export const destroyQueue = (queueId) => {
    return new Promise(function(resolve, reject) {
        deleteQueueLocation(queueId).then((res) => {
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

const deleteQueueLocation = (queueId) => {
    return queueLocations.doc(queueId).delete()
}

const deleteQueueContributors = (queueId) => {
    return queueContributors.doc(queueId).delete()
}

export const locationsInCity = (region, city) => {
    return queueLocations.where("region", "==", region).where("city", "==", city)
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
            name: doc.data().name,
            region: doc.data().region,
            city: doc.data().city,
        })
    })
    return positionArry;
}

export const updateSongs = (queueId, songs) => {
    return queueVotes.doc(queueId).set({
        songs: songs
    }, { merge: true })
}

export const listenToSongs = (queueId) => {
    return queueVotes.doc(queueId)
}

const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQgZ48o39T52Ycjne2VfHtDdR08ftNInjPaTuwFzWyWEKdJJgg'

export const parseSongsFromDoc = (doc) => {
    tempSongArray=[];
    doc.data().songs.map((song) => {
      if(song.imageURL) {
        var tempSong = new Song(id = song.id, name = song.name, artistId = song.artistId, artistName = song.artistName, duration_ms = song.duration_ms, explicit = song.explicit, imageURL = song.imageURL)
      } else {
        var tempSong = new Song(id = song.id, name = song.name, artistId = song.artistId, artistName = song.artistName, duration_ms = song.duration_ms, explicit = song.explicit, imageURL = defaultImage)
      }
      tempSongArray.push(tempSong)
    });
    return tempSongArray;
}
