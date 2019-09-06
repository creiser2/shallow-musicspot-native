//npm run debug will give redux devtools pop up to view and manage state
import React, { Component } from 'react';

//database
// import * as firebase from 'firebase';
import 'firebase/firestore';

//navigation
import AppNavigator from './src/components/AppNavigator';
import LocationWrapper from './src/components/wrappers/LocationWrapper';

//redux stuff
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './store/reducers/rootReducer';
//when someone figures out how to configure these devtools
import { composeWithDevTools } from 'redux-devtools-extension';
import { Permissions, Location } from 'expo';
import ReduxThunk from 'redux-thunk';

/** What is redux?
 * Store - holds our state - THERE IS ONLY ONE STATE
 * Action - State can be modified using actions - SIMPLE OBJECTS
 * Dispatcher - Action needs to be sent by someone - known as dispatching an action
 * Reducer - receives the action and modifies the state to give us a new state
 *  - pure functions
 *  - only mandatory argument is the 'type'
 * Subscriber - listens for state change to update the ui
 */
// When we want to add a middleware later 
// const store = createStore(reducer, composeWithDevTools());

console.disableYellowBox = true;
const store = createStore(
  rootReducer, 
  composeWithDevTools(applyMiddleware(ReduxThunk)),
);

export default class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <LocationWrapper />
      </Provider>
    );
  }
}
