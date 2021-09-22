import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyDQMvnfY9cp-dB6dsIzP5SGweC4JVugy1I",
    authDomain: "financeiro-7c836.firebaseapp.com",
    databaseURL: "https://financeiro-7c836-default-rtdb.firebaseio.com",
    projectId: "financeiro-7c836",
    storageBucket: "financeiro-7c836.appspot.com",
    messagingSenderId: "213955293132",
    appId: "1:213955293132:web:1d2f0c661632ca26d1f769",
    measurementId: "G-J8EHGYZ4ZZ"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
export default firebase;
