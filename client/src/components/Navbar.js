import React from "react";
import { Link } from "react-router-dom";
import { Navbar as Nav } from "react-bootstrap";
import { logout } from "../services/auth";
import Login from "./Login";

const Navbar = props => {
  console.log(props);
  const handleLogout = () => {
    logout();

    props.clearUser(null);
  };

  return (
    <Nav className="nav justify-content-end" bg="light">
      {props.user ? (
        <>
          <Link to="/">Home {props.user.username}</Link>
          <Link to="/about">About</Link>
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
        </>
      ) : (
        <React.Fragment>
          <Login />
          <Link to="/signup">Signup</Link>
        </React.Fragment>
      )}
    </Nav>
  );
};

export default Navbar;
