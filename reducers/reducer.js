const defaultState = {
    isGuest: false
}

export default reducer = (state = defaultState, action) => {
    switch(action.type) {
        case "MAKE_GUEST": 
            return { 
                ...state, isGuest: true  
            }
        default: 
            return state
    }
}