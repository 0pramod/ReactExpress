require("dotenv").config();
const express = require("express");
const cors = require("cors");

const firebase = require("firebase");
const { storage, getStorage, ref, uploadBytes } = require("firebase/storage");
const router = express.Router();
const bodyParser = require("body-parser");
var admin = require("firebase-admin");
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

const ff = firebase.initializeApp(firebaseConfig);
var serviceAccount = require("../firebase/serviceAccountKey.json");
const res = require("express/lib/response");
const { path } = require("express/lib/application");

const fire = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
const FirebaseStorage = firebase.storage();

// const auth = getAuth(ff);

const fileupload = require("express-fileupload");
app.use(fileupload());
global.XMLHttpRequest = require("xhr2");
var XMLHttpRequest = require("xhr2");
var xhr = new XMLHttpRequest();

//for contacts page
router.get("/contacts/:author", async (req, res) => {
  const { author } = req.params;

  const contactsData = await db
    .collection("contacts")
    .where("author", "==", author)
    .orderBy("isFavourite", "desc")
    .orderBy("name")
    .get()
    .then((querySnapshot) =>
      querySnapshot.docs.map((doc) => ({ ID: doc.id, DATA: doc.data() }))
    );
  if (contactsData) res.json(contactsData);
});

// for adding new contacts
router.post("/add", async (req, res) => {
  const file = req.files.file;
  let fileLink;
  const storageRef = FirebaseStorage.ref(`/images/${file.name}`);
  await storageRef
    .put(file.data, {
      contentType: file.mimetype,
    })
    .then(() => storageRef.getDownloadURL()) // after upload, obtain the download URL
    .then(
      (url) => {
        fileLink = url;
      },
      (err) => {
        return 0;
      }
    )
    .catch((err) => {
      return 0;
    });
  dataToAdd = {
    name: req.body.name,
    address: req.body.address,
    email: req.body.email,
    author: req.body.author,
    mobileNumber: req.body.mobileNumber,
    homeNumber: req.body.homeNumber,
    officeNumber: req.body.officeNumber,
    image: fileLink,
    isFavourite: false,
  };
  await db.collection("contacts").add(dataToAdd);
  res.json("Successfully Added");
});

//for deleting contacts
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  if (await db.collection("contacts").doc(id).delete()) res.json("successful");
});

//for updating contact details
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;

  if (
    await db.collection("contacts").doc(id).update({
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      mobileNumber: req.body.mobileNumber,
      homeNumber: req.body.homeNumber,
      officeNumber: req.body.officeNumber,
    })
  )
    res.json("successful");
});

//for making a contact favourite
router.put("/favourite/:id", async (req, res) => {
  const { id } = req.params;
  if (
    await db.collection("contacts").doc(id).update({
      isFavourite: req.body.status,
    })
  )
    res.json("successful");
});
/////

// for user signup
router.post("/signup", async (req, res) => {
  try {
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(req.body.email, req.body.password);
    if (response) {
      db.collection("users").add({
        uid: response.user.uid,
        name: req.body.name,
        email: req.body.email,
      });
      res.json({
        response,
      });
    }
  } catch (e) {
    res.send(e);
  }
});

// for user login
router.post("/login", async (req, res) => {
  try {
    await firebase
      .auth()
      .signInWithEmailAndPassword(req.body.email, req.body.password)
      .then(function () {
        firebase
          .auth()
          .currentUser.getIdToken(true)
          .then(function (idToken) {
            res.json({
              uid: firebase.auth().currentUser.uid,
              idToken: idToken,
              email: req.body.email,
            });
          });
      });
  } catch (err) {
    console.log(err);
  }
});

router.post("/verify/:token", async (req, res) => {
  const { token } = req.params;
  admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      res.json({
        verified: true,
      });
    })
    .catch((error) => {
      res.json({
        verified: false,
      });
    });
});
const port = 5000;
app.use("/", router);
app.listen(port, () => {
  console.log(`server reunning at port: ${port}`);
});
