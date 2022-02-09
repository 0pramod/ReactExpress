import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    var author = localStorage.getItem("uid");
    const response = await axios.post("/add", {
      name,
      email,
      phone,
      author,
    });
    if (response.status === 200) {
      window.location.href = "http://localhost:3000/contacts";
    }
  };

  return (
    <div className="Add Contacts">
      <h2> Add Contacts </h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="name">
          <Form.Label>name</Form.Label>
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
            required="required"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="phone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="number"
            value={phone}
            required="required"
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit">
          Add
        </Button>
      </Form>
    </div>
  );
}
