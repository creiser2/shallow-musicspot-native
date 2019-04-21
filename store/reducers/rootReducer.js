//this file contains all of the reducers combined as the root reducer
//just easier for when we break up and have a user, queue, and map reducer
import userReducer from './userReducer';
import mapReducer from './mapReducer';
import { combineReducers } from 'redux';




const rootReducer = combineReducers({
    user: userReducer,
    map: mapReducer
});

export default rootReducer