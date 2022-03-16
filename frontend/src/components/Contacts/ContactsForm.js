import "./form.css";
import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import Nav from "../Nav/Nav";

export default function ContactsForm() {
  const history = useHistory();
  const location = useLocation();
  const contactsData = location.state;

  var formMode;

  if (contactsData) {
    formMode = "update";
  } else {
    formMode = "create";
  }

  const [contactID, setContactId] = useState(
    formMode === "create" ? "" : contactsData.docID
  );
  const [name, setName] = useState(
    formMode === "create" ? "" : contactsData.name
  );
  const [email, setEmail] = useState(
    formMode === "create" ? "" : contactsData.email
  );
  const [address, setAddress] = useState(
    formMode === "create" ? "" : contactsData.address
  );
  const [imageFile, setImageFile] = useState("");
  const [mobileNumber, setMobileNumber] = useState(
    formMode === "create" ? "" : contactsData.mobileNumber
  );
  const [homeNumber, setHomeNumber] = useState(
    formMode === "create" ? "" : contactsData.homeNumber
  );
  const [officeNumber, setOfficeNumber] = useState(
    formMode === "create" ? "" : contactsData.officeNumber
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    var author = localStorage.getItem("uid");
    const formData = new FormData();
    formData.append("contactID", contactID);
    formData.append("file", imageFile);
    formData.append("name", name);
    formData.append("author", author);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("mobileNumber", mobileNumber);
    formData.append("homeNumber", homeNumber);
    formData.append("officeNumber", officeNumber);

    if (formMode === "create") {
      const response = await axios.post("/add", formData);
      if (response.status === 200) {
        history.push("/");
      }
    }
    if (formMode === "update") {
      const response = await axios.put(`/update/${contactID}`, formData);
      if (response.status === 200) {
        history.push("/");
      }
    }
  };

  return (
    <>
      <Nav></Nav>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="contact-form card shadow">
          <h3>{formMode === "create" ? "Add Contacts" : "Update Contacts"}</h3>
          <hr></hr>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Contacts name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput2"
              placeholder="contacts email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput2"
              placeholder="contacts address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <label className="form-label">Image</label>
          <div className="input-group mb-3">
            <input
              id="inputGroupFile02"
              type="file"
              className="form-control"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone Numbers</label>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Mobile
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="..."
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Home
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="..."
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={homeNumber}
                onChange={(e) => setHomeNumber(e.target.value)}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Office
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="..."
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={officeNumber}
                onChange={(e) => setOfficeNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary">
              {formMode}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
