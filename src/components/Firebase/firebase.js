import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
const config = {
    apiKey: "AIzaSyBVI-Oyd-UtF8Bsc0PBTBR5xMBeTijMqsw",
    authDomain: "clinque-419f2.firebaseapp.com",
    databaseURL: "https://clinque-419f2.firebaseio.com"
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();

