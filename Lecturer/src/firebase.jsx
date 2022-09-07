// import firebase from 'firebase/app'
// import firebase from "firebase"
import  firebase from 'firebase'
import "firebase/auth"
import "firebase/database"
import "firebase/storage"

const app = firebase.initializeApp({
    apiKey: "AIzaSyA-kJPXsOA5sBlV2mG--pHMxLUUnPs4CQA",
    authDomain: "newtodo-e1bcc.firebaseapp.com",
    databaseURL: "https://newtodo-e1bcc-default-rtdb.firebaseio.com",
    projectId: "newtodo-e1bcc",
    storageBucket: "newtodo-e1bcc.appspot.com",
    messagingSenderId: "939350367161",
    appId: "1:939350367161:web:87a3ba85a043b2f71ef468",
    measurementId: "G-VXXM3CEDC7"
})

export const auth = app.auth()
export const db = app.database()
export const storage = app.storage()
export default app