import { 
    loginGuestUser,
    addUserToQueue,
    removeUserFromQueue,
    startQueue,
    destroyQueue,
    locationsInCity,
    decodeLocationQueues,
} from '../../src/api/FirebaseSession'

//user id gets added to the user list, and changes the page to the new queue page
export const joinQueue = (queueId, userId, nextFunc) => {
    return (dispatch) => {
        addUserToQueue(queueId, userId).then((res) => {
            dispatch({type: "JOIN_QUEUE", payload: queueId})
        }).catch((err) => {
            console.log(err)
            showInternetWarning()
        })
    }
}

//ishost set to true when user creates a queue
export const createQueue = (coords, radius=100, hostname, region, city, name, currentSong) => {
    return (dispatch) => {
        startQueue(coords, radius=100, hostname, region, city, name).then((res) => {
            dispatch({type: "CREATE_QUEUE", payload: res.id})
            dispatch({type: "ADD_QUEUE_TO_MAP", payload: {id: res.id, coords: coords, radius: radius, name:name, currentSong: currentSong}})
        }).catch((err) => {
            showInternetWarning()
        })
    }
}

export const deleteQueue = (queueId) => {
    return (dispatch) => {
        destroyQueue(queueId).then((res) => {
            dispatch({type: "DELETE_QUEUE", payload: {id: queueId}})
        }).catch((err) => {
            showInternetWarning()
        })
    }
}