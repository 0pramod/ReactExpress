import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./Login.css";
import { Link } from "react-router-dom";
export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length >= 6;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.post("/signup", {
      name,
      email,
      password,
    });

    if (response.status === 200) {
      window.location.href = "http://localhost:3000/login";
    }
  };

  return (
    <div className="Signup">
      <h2> Signup </h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
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
        <br></br>

        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Signup
        </Button>
      </Form>
      <br></br>
      <p>
        Already Have an account?
        <Link to="/login"> Log In</Link>
      </p>
    </div>
  );
}
