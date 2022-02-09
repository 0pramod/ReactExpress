import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./Login.css";
import Contacts from "../Contacts/Contacts";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length >= 6;
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
    if (response.status === 200) {
      // console.log("here");
      window.location.href = "http://localhost:3000/contacts";
    }
  };

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
        <br></br>
        <Link to="/signup">Dont have an account Sign up</Link>
      </Form>
    </div>
  );
}
