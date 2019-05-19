import * as firebase from 'firebase';
import 'firebase/firestore';

import { createStore, compose } from 'redux'
import { reactReduxFirebase } from 'react-redux-firebase'
import { reduxFirestore } from 'redux-firestore'

export const config = {
apiKey: "AIzaSyCcHjMQ5jDHlemN7qTubjYQmJzu9TDGXA4",
authDomain: "queueme-back.firebaseapp.com",
databaseURL: "https://queueme-back.firebaseio.com",
projectId: "queueme-back",
storageBucket: "queueme-back.appspot.com",
messagingSenderId: "259585678006"
}


firebase.initializeApp(config);

export const db = firebase.firestore();