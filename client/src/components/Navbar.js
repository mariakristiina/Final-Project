import React from "react";
import { Link } from "react-router-dom";
import { Navbar as Nav } from "react-bootstrap";
import { logout } from "../services/auth";
import ("./styling/NavBar.css")

const Navbar = props => {
  const handleLogout = () => {
    logout();

    props.clearUser(null);
  };


  return (
    <div className="navContainer">
    <div className="left">
      <Link className="textName" to="/"><img className="logo"src="/logo.png" />
      B-connection</Link>
      </div>
     
      <div className="right">
      <div>
      {props.user ? (
        <>
          <Link className="text" to={`/profile/${props.user._id}`}>Profile</Link>
          <Link className="text" to={`/posts`}>Posts</Link>
          <Link className="text" to={`/mailbox/${props.user._id}`}>Mailbox</Link>
          <Link className="text" to="/" onClick={handleLogout}>
            LOGOUT
      </Link>
        </>
      ) : (
          <React.Fragment>
            <Link className="text" to="/signup">Signup</Link>
            <Link className="text" to="/login">Login</Link>
          </React.Fragment>
        )}
        </div>

<div className="languages">
{props.currentLanguage === "English" ?
<>
      <button className="underline" onClick={props.handleChangeLanguages}
      value="English"
      >English</button>
      <button onClick={props.handleChangeLanguages}
      value="German"
      >German</button>
      </> :
      <>
      <button onClick={props.handleChangeLanguages}
      value="English"
      >English</button>
      <button className="underline" onClick={props.handleChangeLanguages}
      value="German"
      >German</button>
      </>
       }
      </div>
    </div>
    </div>
  );
};

export default Navbar;
