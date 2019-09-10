//this file contains all of the reducers combined as the root reducer
//just easier for when we break up and have a user, queue, and map reducer
import userReducer from './userReducer';
import mapReducer from './mapReducer';
import queueReducer from './queueReducer';
import { combineReducers } from 'redux';




const rootReducer = combineReducers({
    user: userReducer,
    map: mapReducer,
    queue: queueReducer
});

export default rootReducer