import React, { useState } from "react";
import axios from "axios";

// import firebase from "firebase/app";
// import "firebase/storage";
// const firebaseConfig = {
//   apiKey: "AIzaSyCK61P-hy60G-tcDpPoDajAhWdxTr6kUYE",
//   authDomain: "reactexpress-892de.firebaseapp.com",
//   projectId: "reactexpress-892de",
//   storageBucket: "reactexpress-892de.appspot.com",
//   messagingSenderId: "834629539169",
//   appId: "1:834629539169:web:7cdec58d1f48e31c77e120",
//   measurementId: "G-K604M3GBZB",
// };
// //console.log(firebaseConfig);
// // firebase.initializeApp(firebaseConfig);
// // const storage = firebase.storage();
// //console.log(storage);
export default function Test() {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    try {
      const res = await axios.post("photo/", formData);
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div className="App">
      <input type="file" onChange={saveFile} />
      <button onClick={uploadFile}>Upload</button>
    </div>
  );
}
