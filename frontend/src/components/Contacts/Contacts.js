import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

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
  return (
    <>
      {loading ? (
        "Loading"
      ) : (
        <div>
          <ul>
            {contactResponse &&
              contactResponse.map((person) => (
                <div>
                  <li key={person.DATA.email}>
                    {person.DATA.email}
                    {person.DATA.name}
                  </li>
                  <button onClick={(e) => deleteData(e, person.ID)}>
                    {" "}
                    Delete
                  </button>
                </div>
              ))}
          </ul>
        </div>
      )}
    </>
  );
}
