import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

let config = {
    apiKey: "AIzaSyCcHjMQ5jDHlemN7qTubjYQmJzu9TDGXA4",
    authDomain: "queueme-back.firebaseapp.com",
    databaseURL: "https://queueme-back.firebaseio.com",
    projectId: "queueme-back",
    storageBucket: "queueme-back.appspot.com",
    messagingSenderId: "259585678006"
}

firebase.initializeApp(config);
export const db = firebase.firestore();