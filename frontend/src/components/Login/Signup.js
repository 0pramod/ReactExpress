import React, { useState } from "react";
import Login from "./Login";
import axios from "axios";
import "./Login.css";
import { Link, Route, useHistory } from "react-router-dom";
export default function Signup() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function validateForm() {
    return (
      email.length > 0 && password.length >= 6 && password === confirmPassword
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(imageFile);
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    const response = await axios.post("/signup", formData);

    if (response.status === 200) {
      // window.location.href = "http://localhost:3000/login";
      history.push("/login");
    }
  };

  return (
    <form className="row g-3" onSubmit={handleSubmit}>
      <div className="contact-form card shadow">
        <h2> Create your account </h2>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Your name"
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
            placeholder="Your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className=" mb-3">
          <label className="form-label">Image</label>
          <input
            type="file"
            className="form-control"
            required
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm password</label>
          <input
            type="password"
            className="form-control"
            placeholder="confirm password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="col-auto">
          <button
            type="submit"
            disabled={!validateForm()}
            className="btn btn-primary"
          >
            Signup
          </button>
        </div>
        <br></br>{" "}
        <p>
          Already Have an account? <Link to="/login"> Log In</Link>{" "}
        </p>
      </div>
    </form>
  );
}
