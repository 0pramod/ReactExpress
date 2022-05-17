require("dotenv").config();
require("firebase/auth");
const express = require("express");
const cors = require("cors");
const router = express.Router();
const bodyParser = require("body-parser");
const res = require("express/lib/response");
const { path } = require("express/lib/application");
const app = express();
const fileupload = require("express-fileupload");
const XMLHttpRequest = require("xhr2");
const xhr = new XMLHttpRequest();
const {
  firebase,
  admin,
  getAuth,
  db,
  FirebaseStorage,
} = require("./firebase/firebase.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileupload());
global.XMLHttpRequest = require("xhr2");

//route for contacts page
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
  contactsData ? res.json(contactsData) : res.json("can't fetch data");
});

//route for adding new contacts
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
      (error) => {
        res.json(error);
      }
    )
    .catch((error) => {
      res.json(error);
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
  if (fileLink) {
    await db.collection("contacts").add(dataToAdd);
    res.json("Successfully Added");
  } else res.json("unsuccessfull");
});

//route for deleting contacts
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const didDeleted = await db.collection("contacts").doc(id).delete();
  didDeleted ? res.json("successful") : res.json("Delete unsuccessful");
});

//for updating contact details
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;

  const didUpdate = await db.collection("contacts").doc(id).update({
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    mobileNumber: req.body.mobileNumber,
    homeNumber: req.body.homeNumber,
    officeNumber: req.body.officeNumber,
  });
  didUpdate ? res.json("successful") : res.json("Update unsuccessful");
});

//for making a contact favourite
router.put("/favourite/:id", async (req, res) => {
  const { id } = req.params;
  (await db.collection("contacts").doc(id).update({
    isFavourite: req.body.status,
  }))
    ? res.json("successful")
    : res.json("Unsuccessful");
});

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
  } catch (error) {
    res.json(error);
  }
});

const port = process.env.PORT || 5000;
if (process.env.MODE_ENV === "production") {
  app.use(express.static("../frontend/build"));
  app.get("*", (req, res) => {
    req.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}
app.use("/", router);
app.listen(port, () => {
  console.log(`server reunning at port: ${port}`);
});
