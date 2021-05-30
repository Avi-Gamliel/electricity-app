import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCeLA27coCGKTz0cmVhu0raoLUbugZX1BE",
    authDomain: "track-your-electricity.firebaseapp.com",
    projectId: "track-your-electricity",
    storageBucket: "track-your-electricity.appspot.com",
    messagingSenderId: "522719535763",
    appId: "1:522719535763:web:89b884dd8cbf100a59e366"
};
let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth }