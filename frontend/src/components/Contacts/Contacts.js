import React, { useState, useEffect } from "react";
import "./form.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import Nav from "../Nav";
export default function Contacts() {
  const [contactResponse, setcontactResponse] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = useEffect(() => {
    const getDataFromBackend = async () => {
      var author = localStorage.getItem("uid");
      const response = await axios.get(`/contacts/${author}`);

      setcontactResponse(response.data);

      setLoading(false);
    };
    getDataFromBackend();
  }, []);
  const deleteData = async (e, id) => {
    e.preventDefault();
    const response = await axios.delete(`/delete/${id}`);
    if (response.data === "successful") fetchData(); //window.location.reload(true);
  };
  const makeFavourite = async (e, id, status) => {
    e.preventDefault();
    const response = await axios.put(`/favourite/${id}`, {
      status: !status,
    });
    if (response.data === "successful") fetchData(); //window.location.reload(true);
  };
  const logOut = () => {
    window.localStorage.clear();
    window.location.reload(true);
  };
  let x = 19;
  return (
    <>
      {loading ? (
        "Loading"
      ) : (
        <>
          <Nav></Nav>

          <div>
            <ul>
              {contactResponse &&
                contactResponse.map((person, index) => (
                  <div className="contacts-card">
                    <br></br>
                    <div
                      class="card shadow p-3 mb-5 bg-body rounded"
                      style={{ width: "25rem" }}
                    >
                      <div class=" d-md-flex justify-content-md-end">
                        <button
                          class="btn btn-sm btn-light "
                          onClick={(e) =>
                            makeFavourite(e, person.ID, person.DATA.isFavourite)
                          }
                          type="button"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            color="red"
                            fill={
                              person.DATA.isFavourite
                                ? "#ffdf00"
                                : "currentfill"
                            }
                            class="bi bi-star"
                            viewBox="0 0 15 15"
                          >
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                          </svg>
                        </button>
                      </div>

                      <img
                        src="https://images.unsplash.com/photo-1645193601259-63ad87c0b4a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        class="card-img-top"
                        alt="..."
                      />
                      <div class="card-body">
                        <h5 class="card-title">{person.DATA.name}</h5>{" "}
                        <p class="card-text">{person.DATA.email}</p>
                      </div>
                      <ul class="list-group list-group-flush">
                        {person.DATA.home ? (
                          <li class="list-group-item">
                            Home: {person.DATA.home}
                          </li>
                        ) : (
                          <></>
                        )}
                        {person.DATA.mobile ? (
                          <li class="list-group-item">
                            Mobile: {person.DATA.mobile}
                          </li>
                        ) : (
                          <></>
                        )}
                        {person.DATA.office ? (
                          <li class="list-group-item">
                            Office: {person.DATA.office}
                          </li>
                        ) : (
                          <></>
                        )}
                      </ul>
                      <div class="card-body">
                        <button class="card-link btn btn-warning">
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
                        </button>
                        <button
                          class=" card-link btn btn-danger"
                          onClick={(e) => deleteData(e, person.ID)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <br></br>
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
        </>
      )}
    </>
  );
}
