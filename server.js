const express = require("express");
const router = express.Router();
var admin = require("firebase-admin");

var serviceAccount = require("./firebase/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();

const customers = { id: 1, firstName: "John", lastName: "Doe" };
db.collection("contacts").add({
  id: 5,
  firstName: "John",
  lastName: "Djhyjhhjv",
});

all = [];
router.get("/", async (req, res) => {
  console.log("test");
  const daaa = await db
    .collection("contacts")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        all.push(doc.data());
        console.log(doc.id, " => ", doc.data());
      });
    });
  // console.log(daaa);
  res.json(all);
});

const port = 5000;
app.use("/", router);
app.listen(port, () => {
  console.log(`server reunning at port: ${port}`);
});
