import React from "react";
import { Link } from "react-router-dom";
export default function Nav() {
  const logOut = () => {
    window.localStorage.clear();
    window.location.reload(true);
  };
  return (
    <>
      <nav className="navbar shadow navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          Welcome
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item active">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/contacts"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/form"
                >
                  Add contacts
                </Link>
              </li>
            </ul>

            {localStorage.getItem("email")}

            <br></br>
            <button
              className="btn btn-outline-success"
              onClick={(e) => logOut(e)}
              type="submit"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
