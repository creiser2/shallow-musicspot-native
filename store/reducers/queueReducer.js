
const defaultState = {
    isHost: false,
    queueId: null,
    songs: [
    ]
}

//reducer is called when a dispatch is made from one of our components
//the reducer handles updating the redux state of the application
export default queueReducer = (state = defaultState, action) => {
    switch(action.type) {
        //updates redux queue values to reflect
        case "JOIN_QUEUE":
            return {
                ...state,
                queueId: action.payload
            }
        case "CREATE_QUEUE":
            return {
                ...state,
                queueId: action.payload,
                isHost: true
            }
        case "UPDATE_SONGS":
            return {
                ...state,
                songs: action.payload
            }
        default: 
            return state
    }
}