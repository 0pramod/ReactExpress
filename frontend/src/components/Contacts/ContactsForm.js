import "./form.css";
import React from "react";
import Nav from "../Nav";

export default function ContactsForm() {
  return (
    <>
      <Nav></Nav>
      <form class="row g-3">
        <div className="contact-form card shadow">
          <div className="mb-3">
            <label for="formGroupExampleInput" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Contacts name"
            />
          </div>
          <div className="mb-3">
            <label for="formGroupExampleInput2" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput2"
              placeholder="contacts email"
            />
          </div>
          <div className="mb-3">
            <label for="formGroupExampleInput2" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput2"
              placeholder="contacts address"
            />
          </div>
          <div class="input-group mb-3">
            <input type="file" class="form-control" id="inputGroupFile02" />
            <label class="input-group-text" for="inputGroupFile02">
              Upload
            </label>
          </div>
          <div className="mb-3">
            <label for="formGroupExampleInput2" className="form-label">
              Phone Numbers
            </label>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">
                Mobile
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">
                Home
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">
                Office
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
          <div class="col-auto">
            <button type="submit" class="btn btn-primary">
              Create
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
