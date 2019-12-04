import React from "react";
import { Link } from "react-router-dom";
import { Navbar as Nav } from "react-bootstrap";
import { logout } from "../services/auth";


const Navbar = props => {
  console.log(props);
  const handleLogout = () => {

    logout();

    props.clearUser(null);
  }

  return (
    <Nav className="nav justify-content-end" bg="primary">
      {props.user ? (
        <>
          <Link to="/">Home  {props.user.username}</Link>
          <Link to="/about">About</Link>
          <Link to="/" onClick={handleLogout}>
            Logout
      </Link>
        </>
      ) : (
          <React.Fragment>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </React.Fragment>
        )}
    </Nav>
  )

}

export default Navbar; 
