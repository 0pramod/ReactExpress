import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./Login.css";
import { Link } from "react-router-dom";
export default function Signup() {
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
    const response = await axios.post("/signup", {
      name,
      email,
      password,
      imageFile,
    });

    if (response.status === 200) {
      window.location.href = "http://localhost:3000/login";
    }
  };

  return (
    // <div className="Signup">
    //   <h2> Signup </h2>
    //   <Form onSubmit={handleSubmit}>
    //     <Form.Group size="lg" controlId="name">
    //       <Form.Label>Name</Form.Label>
    //       <Form.Control
    //         autoFocus
    //         type="text"
    //         value={name}
    //         onChange={(e) => setName(e.target.value)}
    //       />
    //     </Form.Group>
    //     <Form.Group size="lg" controlId="email">
    //       <Form.Label>Email</Form.Label>
    //       <Form.Control
    //         autoFocus
    //         type="email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       />
    //     </Form.Group>
    //     <Form.Group size="lg" controlId="password">
    //       <Form.Label>Password</Form.Label>
    //       <Form.Control
    //         type="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //     </Form.Group>
    //     <br></br>

    //     <Button block size="lg" type="submit" disabled={!validateForm()}>
    //       Signup
    //     </Button>
    //   </Form>
    //   <br></br>
    //   <p>
    //     Already Have an account?
    //     <Link to="/login"> Log In</Link>
    //   </p>
    // </div>

    <form class="row g-3" onSubmit={handleSubmit}>
      <div className="contact-form card shadow">
        <div className="mb-3">
          <label for="formGroupExampleInput" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Your name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            placeholder="Your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div class=" mb-3">
          <label for="formGroupExampleInput2" className="form-label">
            Image
          </label>
          <input
            type="file"
            class="form-control"
            required
            id="inputGroupFile02"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </div>

        <div className="mb-3">
          <label for="formGroupExampleInput2" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label for="formGroupExampleInput2" className="form-label">
            Confirm password
          </label>
          <input
            type="password"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="confirm password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div class="col-auto">
          <button
            type="submit"
            disabled={!validateForm()}
            class="btn btn-primary"
          >
            Signup
          </button>
        </div>
      </div>
    </form>
  );
}
