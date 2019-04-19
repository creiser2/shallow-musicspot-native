//this file contains all of the reducers combined as the root reducer
//just easier for when we break up and have a user, queue, and map reducer
import userReducer from './userReducer';
import { combineReducers } from 'redux';




const rootReducer = combineReducers({
    user: userReducer,
});

export default rootReducer