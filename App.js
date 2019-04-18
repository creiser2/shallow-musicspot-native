import React, { Component } from 'react';

//database
import * as firebase from 'firebase';
import 'firebase/firestore';

//navigation
import AppNavigator from './src/components/AppNavigator';

//redux stuff
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers/reducer';
// import composeWithDevTools from 'redux-devtools-extension';
// import ReduxThunk from 'redux-thunk';

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
//const store = createStore(reducer, composeWithDevTools(applyMiddleware(ReduxThunk)))

const store = createStore(reducer)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator/>
      </Provider>
    );
  }
}