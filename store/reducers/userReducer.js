const defaultState = {
    isGuest: false,
    guestCreationFailed: false,
    user: {
        username: null,
        //the location of the user, constantly updated
        //default to san francisco
        location: {
            latitude: 37.774,
            longitude: -122.431
        },
        uid: null
    },
    queue: {
        isHost: false,
        id: null
    }
}


//reducer is called when a dispatch is made from one of our components
//the reducer handles updating the redux state of the application
export default userReducer = (state = defaultState, action) => {
    switch(action.type) {
        case "MAKE_GUEST": 
            //spread operator takes all values of state and destructures them so we can edit the outside layer easily
            return { 
                ...state, isGuest: true,
                user: {
                    ...state.user,
                    uid: action.payload
                }  
            }
        case "MAKE_GUEST_ERROR":
            return {
                ...state, guestCreationFailed: true
            }
        case "UPDATE_COORDS":
            return {
                ...state,
                user: {
                    ...state.user,
                    location: {
                        latitude: action.payload.latitude,
                        longitude:  action.payload.longitude
                    }
                }
            }
        case "SET_USERNAME":
            return {
                ...state,
                user: {
                    ...state.user,
                    username: action.payload
                }
            }
        case "SET_UID":
            return {
                ...state,
                user: {
                    ...state.user,
                    uid: action.payload
                }
            }
        case "CREATE_QUEUE":
            return {
                ...state,
                queue: {
                    isHost: true,
                    id: action.payload.id
                }
            }
        //resets all user settings to default
        case "DESTROY_USER":
            return defaultState
        //default case always returns the state of the application
        default: 
            return state
    }
}