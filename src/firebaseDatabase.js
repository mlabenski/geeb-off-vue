import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBi2QO7VDArDuwV7F0t_RzHTSvvgenPYJU",
    authDomain: "geeb-off-functions.firebaseapp.com",
    databaseURL: "https://geeb-off-functions.firebaseio.com",
    projectId: "geeb-off-functions",
    storageBucket: "geeb-off-functions.appspot.com",
    messagingSenderId: "3979637654",
    appId: "1:3979637654:web:c44699eac00cb4707a63b7"
}

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();