const express = require("express");
const firebase = require("firebase");
const router = express.Router();
const bodyParser = require("body-parser");
var admin = require("firebase-admin");
require("firebase/auth");
const firebaseConfig = {
  apiKey: process.env.API_Key,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);
var serviceAccount = require("./firebase/serviceAccountKey.json");
const res = require("express/lib/response");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.get("/contacts", async (req, res) => {
  console.log("test");
  const allData = await db
    .collection("contacts")
    .get()
    .then((querySnapshot) =>
      querySnapshot.docs.map((doc) => ({ ID: doc.id, DATA: doc.data() }))
    );
  res.json(allData);
});
router.post("/add", async (req, res) => {
  dataToAdd = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    author: req.body.author,
    isFavourite: false,
  };
  await db.collection("contacts").add(dataToAdd);
  res.json("Successfully Added");
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await db.collection("contacts").doc(id).delete();
  res.json("successful");
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  await db.collection("contacts").doc(id).delete();
  res.json("successful");
});
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
    } else {
      res.json({});
      return;
    }
  } catch (e) {}
});
router.post("/login", (req, res) => {
  firebase
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
        })
        .catch(function (error) {});
    })
    .catch(function (error) {});
});

const port = 5000;
app.use("/", router);
app.listen(port, () => {
  // console.log(`server reunning at port: ${port}`);
});
