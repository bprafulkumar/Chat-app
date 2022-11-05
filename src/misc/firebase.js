import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'


const config = {
    apiKey: "AIzaSyB13-tWQk3mpp1hwmA2tPckw8Bifk2r5j0",
    authDomain: "chat-application-16c39.firebaseapp.com",
    databaseURL: "https://chat-application-16c39-default-rtdb.firebaseio.com",
    projectId: "chat-application-16c39",
    storageBucket: "chat-application-16c39.appspot.com",
    messagingSenderId: "245592868676",
    appId: "1:245592868676:web:9c95af2d5e9b295be8b911",
    measurementId: "G-F76CF3V8MH"
  };

 const app =  firebase.initializeApp(config)

 export const auth = app.auth();
 export const database = app.database();
 export const storage = app.storage()



// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// const config = {
//   apiKey: "AIzaSyB13-tWQk3mpp1hwmA2tPckw8Bifk2r5j0",
//   authDomain: "chat-application-16c39.firebaseapp.com",
//   databaseURL: "https://chat-application-16c39-default-rtdb.firebaseio.com",
//   projectId: "chat-application-16c39",
//   storageBucket: "chat-application-16c39.appspot.com",
//   messagingSenderId: "245592868676",
//   appId: "1:245592868676:web:9c95af2d5e9b295be8b911",
//   measurementId: "G-F76CF3V8MH"
// };

// const app = initializeApp(config);
// const analytics = getAnalytics(app);

