const firebase = require("firebase");
const { storage, getStorage, ref, uploadBytes } = require("firebase/storage");

const admin = require("firebase-admin");
require("firebase/auth");
const getAuth = require("firebase/auth");
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};
firebase.initializeApp(firebaseConfig);
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
const FirebaseStorage = firebase.storage();

module.exports = { firebase, admin, getAuth, db, FirebaseStorage };
