require("dotenv").config();
const express = require("express");
const cors = require("cors");

const firebase = require("firebase");
const { storage, getStorage, ref, uploadBytes } = require("firebase/storage");
const router = express.Router();
const bodyParser = require("body-parser");
var admin = require("firebase-admin");
require("firebase/auth");
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
var serviceAccount = require("./firebase/serviceAccountKey.json");
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

router.get("/contacts/:author", async (req, res) => {
  const { author } = req.params;

  const allData = await db
    .collection("contacts")
    .where("author", "==", author)
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

router.put("/update/:id", async (req, res) => {
  const { id } = req.params;

  await db.collection("contacts").doc(id).update({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  });

  res.json("successful");
});
router.put("/favourite/:id", async (req, res) => {
  const { id } = req.params;

  await db.collection("contacts").doc(id).update({
    isFavourite: req.body.status,
  });

  res.json("successful");
});
/////
const fileupload = require("express-fileupload");
app.use(fileupload());

router.post("/photo", async (req, res) => {
  console.log("here");
  console.log(req.body.file);
  const storageA = firebase.storage();
  const file = req.files.file;
  const filename = file.name;
  console.log(file);
  //console.log(file.path);
  console.log("filename:", filename);
  const ref = storageA.ref(`/images/${file.name}`);
  const uploadTask = ref.put(file);

  uploadTask.on(
    "state_changed",
    (snapShot) => {
      //takes a snap shot of the process as it is happening
      console.log(snapShot);
    },
    (err) => {
      //catches the errors
      console.log(err);
    },
    () => {
      // gets the functions from storage refences the image storage in firebase by the children
      // gets the download url then sets the image from firebase as the value for the imgUrl key:
      storage
        .ref("images")
        .child(file.name)
        .getDownloadURL()
        .then((fireBaseUrl) => {
          setFile((prevObject) => ({
            ...prevObject,
            imgUrl: fireBaseUrl,
          }));
        });
    }
  );

  // const storageRef = await firebase
  //   .storage()
  //   .ref("images/" + file.name)
  //   .put(file);
  // //if (storageRef) console.log(storageRef);
  // //const fileRef = storageRef.child("photos");
  //await storageRef.put(file);
  // const link = await fileRef.getDownloadURL();

  //const storageRef = firebase.storage().ref(`imges/${filename}`);
  // uploadBytes(storageRef, file).then((snapshot) => {
  //  console.log("Uploaded a blob or file!");
  //});
  // firebase.storage().child("Photos").child(filename).put(file);

  // storageRef.on(
  //   `state_changed`,
  //   (snapshot) => {
  //     //console.log(snapshot);
  //     //console.log(storageRef.snapshot.ref.getDownloadURL().then(downloadURL));
  //     // this.uploadValue =
  //     //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //   },
  //   (error) => {
  //     console.log(error.message);
  //   }
  //   // () => {
  //   //   storageRef.snapshot.ref.getDownloadURL().then((downloadURL) => {
  //   //     //this.$emit("audioUrl", downloadURL);
  //   //   });
  //   // }
  // );
});
////
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
router.post("/login", async (req, res) => {
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
        })
        .catch(function (error) {
          console.log("sorry");
        });
    })
    .catch(function (error) {
      console.log("sorry");
    });
  console.log("here");
});

const port = 5000;
app.use("/", router);
app.listen(port, () => {
  console.log(`server reunning at port: ${port}`);
});
