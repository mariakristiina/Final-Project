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
      <Link to="/">Home</Link>
      {props.user ? (
        <>
          <Link to="/" onClick={handleLogout}>
            Logout
      </Link>
          <Link to={`/profile/${props.user._id}`}>Profile</Link>
          <Link to={`/posts`}>Posts</Link>
        </>
      ) : (
          <React.Fragment>
            <Link to="/about">About</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </React.Fragment>
        )}
      <select name="languages" id="languages" onChange={props.handleChangeLanguages}>
        <option value="English">🇬🇧English</option>
        <option value="German"> 🇩🇪German</option>
      </select>
    </Nav>
  );
};

export default Navbar;
