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

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const fileupload = require("express-fileupload");
app.use(fileupload());
global.XMLHttpRequest = require("xhr2");
var XMLHttpRequest = require("xhr2");
var xhr = new XMLHttpRequest();

var uploadFileToFirebaseStorage = (file) => {
  console.log("here");
  console.log("file:", file.data);
  const FirebaseStorage = firebase.storage();
  const storageRef = FirebaseStorage.ref(`/images/${file.name}`);
  storageRef
    .put(file.data, {
      contentType: file.mimetype,
    })
    .then(() => storageRef.getDownloadURL()) // after upload, obtain the download URL
    .then(
      (url) => {
        // persisted to storage successfully and obtained download URL
        console.log("222", url);
        return url;
      },
      (err) => {
        // failed to save to storage
        return 0;
      }
    )
    .catch((err) => {
      // if here, something has gone wrong while sending back the response
      // likely a syntax error, or sending responses multiple times
      return 0;
    });
};

//for contacts page
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

// for adding new contacts
router.post("/add", async (req, res) => {
  const file = req.files.file;
  let fileLink;
  //console.log(req.body);

  const FirebaseStorage = firebase.storage();
  const storageRef = FirebaseStorage.ref(`/images/${file.name}`);
  await storageRef
    .put(file.data, {
      contentType: file.mimetype,
    })
    .then(() => storageRef.getDownloadURL()) // after upload, obtain the download URL
    .then(
      (url) => {
        // persisted to storage successfully and obtained download URL
        fileLink = url;
      },
      (err) => {
        // failed to save to storage
        return 0;
      }
    )
    .catch((err) => {
      // if here, something has gone wrong while sending back the response
      // likely a syntax error, or sending responses multiple times
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
  await db.collection("contacts").doc(id).delete();
  res.json("successful");
});

//for updating contact details
router.put("/update/:id", async (req, res) => {
  console.log("here");

  const { id } = req.params;

  console.log(id);

  await db.collection("contacts").doc(id).update({
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    mobileNumber: req.body.mobileNumber,
    homeNumber: req.body.homeNumber,
    officeNumber: req.body.officeNumber,
  });

  res.json("successful");
});

//for making a contact favourite
router.put("/favourite/:id", async (req, res) => {
  const { id } = req.params;

  await db.collection("contacts").doc(id).update({
    isFavourite: req.body.status,
  });

  res.json("successful");
});
/////

router.post("/photo", upload.single("image"), async (req, res) => {
  //

  const file = req.files.file;
  console.log(file);
  const imageUrl = await uploadFileToFirebaseStorage(file);
  console.log(imageUrl);
  // const filename = file.name;
  // //

  // console.log("files", file);
  // console.log("name", req.body.name);
  // console.log("The thing", req.files.image);
  // const storageA = firebase.storage();
  // // const file = req.files.image;

  // console.log("filename:", file.name);
  // console.log(file.data);
  // const ref = storageA.ref(`/images/${file.name}`);
  // ref
  //   .put(file.data, {
  //     contentType: file.mimetype,
  //   })
  //   .then(() => ref.getDownloadURL()) // after upload, obtain the download URL
  //   .then(
  //     (url) => {
  //       // persisted to storage successfully and obtained download URL
  //       res
  //         .status(201)
  //         .set("Content-Location", url) // use "Location" if you want to redirect to it
  //         .json({
  //           message: "Upload successful",
  //           url: url,
  //         });
  //     },
  //     (err) => {
  //       // failed to save to storage
  //       logger.error({
  //         message: "Upload failed with error",
  //         errorMessage: err.message,
  //         errorStack: err.stack,
  //       });

  //       res.status(500).json({
  //         message: "Upload failed",
  //         error: err.code || "unknown",
  //       });
  //     }
  //   )
  //   .catch((err) => {
  //     // if here, something has gone wrong while sending back the response
  //     // likely a syntax error, or sending responses multiple times
  //     logger.error({
  //       message: "Unexpected rejection during /addImage",
  //       errorMessage: err.message,
  //       errorStack: err.stack,
  //     });
  //   });
});

// for user signup
router.post("/signup", async (req, res) => {
  //console.log("testing:", req.files.file);
  console.log("hcvgdsv:", req.body.name);
  console.log(" test:", req.files.file);
  const file = req.files.file;
  let fileLink;
  //console.log(req.body);

  const FirebaseStorage = firebase.storage();
  const storageRef = FirebaseStorage.ref(`/images/${file.name}`);
  await storageRef
    .put(file.data, {
      contentType: file.mimetype,
    })
    .then(() => storageRef.getDownloadURL()) // after upload, obtain the download URL
    .then(
      (url) => {
        // persisted to storage successfully and obtained download URL
        fileLink = url;
      },
      (err) => {
        // failed to save to storage
        return 0;
      }
    )
    .catch((err) => {
      // if here, something has gone wrong while sending back the response
      // likely a syntax error, or sending responses multiple times
      return 0;
    });
  try {
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(req.body.email, req.body.password);
    if (response) {
      db.collection("users").add({
        uid: response.user.uid,
        name: req.body.name,
        email: req.body.email,
        image: fileLink,
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

// for user login
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
