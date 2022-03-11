import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Nav from "../Nav";

export default function UpdateContacts() {
  const location = useLocation();
  const contactsData = location.state;

  const [name, setName] = useState(contactsData.name);
  const [email, setEmail] = useState(contactsData.email);
  const [phone, setPhone] = useState(contactsData.phone);
  const contactsID = contactsData.docID;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.put(`/update/${contactsID}`, {
      name,
      email,
      phone,
    });
    if (response.status === 200) {
      window.location.href = "http://localhost:3000/contacts";
    }
  };

  return (
    <>
      <Nav></Nav>
      <div className="add-contacts">
        <h2> Update Contacts </h2>
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
            Update
          </Button>
        </Form>
      </div>
    </>
  );
}
