const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
var admin = require("firebase-admin");

var serviceAccount = require("./firebase/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const customers = { id: 1, firstName: "John", lastName: "Doe" };
db.collection("contacts").add({
  id: 5,
  firstName: "John",
  lastName: "Djhyjhhjv",
});

let all = [];
router.get("/", async (req, res) => {
  console.log("test");
  const daaa = await db
    .collection("contacts")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        all.push(doc.data());
        // console.log(doc.id, " => ", doc.data());
      });
    });
  // console.log(daaa);
  res.json(all);
});
router.post("/add", async (req, res) => {
  console.log(req.body.name);
  dataToAdd = {
    Name: req.body.name,
    Phone: req.body.phone,
    Email: req.body.email,
  };
  await db.collection("contacts").add(dataToAdd);
  console.log("hello");
  res.json({
    a: 1,
    b: 2,
  });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  await db.collection("contacts").doc(id).delete();
  res.json("successful");
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  await db.collection("contacts").doc(id).delete();
  res.json("successful");
});

const port = 5000;
app.use("/", router);
app.listen(port, () => {
  console.log(`server reunning at port: ${port}`);
});
