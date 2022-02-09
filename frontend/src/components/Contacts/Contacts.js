import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Contacts() {
  const [contactResponse, setcontactResponse] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDataFromBackend = async () => {
      const response = await axios.get("/contacts");

      setcontactResponse(response.data);

      setLoading(false);
    };
    getDataFromBackend();
  }, []);
  const deleteData = async (e, id) => {
    e.preventDefault();
    const response = await axios.delete(`/delete/${id}`);
    if (response.data === "successful") window.location.reload(true);
  };

  const logOut = () => {
    window.localStorage.clear();
    window.location.reload(true);
  };
  return (
    <>
      {loading ? (
        "Loading"
      ) : (
        <div>
          <ul>
            {contactResponse &&
              contactResponse.map((person, index) => (
                <div>
                  <Form>
                    <Form.Group size="lg" controlId="id">
                      <Form.Control
                        required="required"
                        type="hidden"
                        value={person.ID}
                      />
                    </Form.Group>
                    <Form.Group size="lg" controlId="name">
                      <Form.Label>name</Form.Label>
                      <Form.Control
                        autoFocus
                        required="required"
                        type="text"
                        value={person.DATA.name}
                      />
                    </Form.Group>
                    <Form.Group size="lg" controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        autoFocus
                        required="required"
                        type="email"
                        value={person.DATA.email}
                      />
                    </Form.Group>
                    <Form.Group size="lg" controlId="phone">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control type="number" value={person.DATA.phone} />
                    </Form.Group>
                    <button onClick={(e) => deleteData(e, person.ID)}>
                      {" "}
                      Delete
                    </button>
                    <Link
                      to={{
                        pathname: "/updatecontacts",
                        state: {
                          docID: person.ID,
                          name: person.DATA.name,
                          email: person.DATA.email,
                          phone: person.DATA.phone,
                        },
                      }}
                    >
                      Update
                    </Link>
                  </Form>
                  <div>
                    <hr></hr>
                  </div>
                </div>
              ))}
          </ul>
          <button
            onClick={(e) => {
              window.location.href = "http://localhost:3000/addcontacts";
            }}
          >
            Add Contacts
          </button>
          <button onClick={(e) => logOut(e)}> Logout</button>
        </div>
      )}
    </>
  );
}
