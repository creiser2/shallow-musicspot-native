
import { showInternetWarning } from '../../src/components/common/CustomToast'
import { 
    startQueue,
    destroyQueue,
    locationsInCity,
    decodeLocationQueues,
} from '../../src/api/FirebaseSession'

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

export const deleteQueue = (queueId) => {
    return (dispatch) => {
        destroyQueue(queueId).then((res) => {
            dispatch({type: "DELETE_QUEUE", payload: {id: queueId}})
        }).catch((err) => {
            showInternetWarning()
        })
    }
}

export const getQueuesByCity = (region="anonymous", city="anonymous") => {
    return (dispatch) => {
        locationsInCity(region, city).onSnapshot(function(querySnapshot) {
            payload = decodeLocationQueues(querySnapshot);
            dispatch({type: "GET_QUEUES_BY_CITY", payload: payload})
        }, function(error) {
          showInternetWarning()
        })
    }
}
