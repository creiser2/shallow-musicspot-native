const defaultState = {
    isGuest: false,
    guestCreationFailed: false,
    user: {
        username: null
    }
}


//reducer is called when a dispatch is made from one of our components
//the reducer handles updating the redux state of the application
export default userReducer = (state = defaultState, action) => {
    switch(action.type) {
        case "MAKE_GUEST": 
            //spread operator takes all values of state and destructures them so we can edit the outside layer easily
            return { 
                ...state, isGuest: true  
            }
        case "MAKE_GUEST_ERROR":
            return {
                ...state, guestCreationFailed: true
            }
        case "SET_USERNAME":
            return {
                ...state,
                user: {
                    ...state.user,
                    username: action.payload
                }
            }
        //default case always returns the state of the application
        default: 
            return state
    }
}