import React from "react";
import { Link } from "react-router-dom";
import { Navbar as Nav } from "react-bootstrap";
import { logout } from "../services/auth";

const Navbar = props => {
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
          <Link to={`/profile/${props.user._id}`}>Profile</Link>
          <Link to={`/posts`}>Posts</Link>
          <Link to={`/mailbox/${props.user._id}`}>Mailbox</Link>
        </>
      ) : (
          <React.Fragment>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
            
          </React.Fragment>
        )}
    </Nav>
  );
};

export default Navbar;
