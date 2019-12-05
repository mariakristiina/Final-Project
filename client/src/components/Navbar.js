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
          <Link to="/" onClick={handleLogout}>
            Logout
      </Link>
          <Link to="/profile/:id">Profile</Link>
        </>
      ) : (
          <React.Fragment>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
            <Login/>
          </React.Fragment>
        )}
    </Nav>
  );
};

export default Navbar;
