import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import axios from "axios";
import "./Login.css";

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return (
      password.length >= 6 &&
      email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.post("/login", {
      email,
      password,
    });
    localStorage.setItem("uid", response.data.uid);
    localStorage.setItem("idToken", response.data.idToken);
    localStorage.setItem("email", response.data.email);

    if (response.status === 200) history.push("/");
  };

  return (
    <div>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="contact-form card shadow">
          <h2> Log In </h2>
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
          <div className="col-auto">
            <button
              type="submit"
              disabled={!validateForm()}
              className="btn btn-primary"
            >
              Log In
            </button>
          </div>
          <br></br>{" "}
          <p>
            Dont have an account? <Link to="/signup"> Sign up</Link>{" "}
          </p>
        </div>
      </form>
    </div>
  );
}
