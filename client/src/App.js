import React from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import { Route } from "react-router-dom";
import Signup from "./components/Signup"
import Login from "./components/Login"
import Profile from "./components/Profile";
import Home from "./components/Home";



class App extends React.Component {
  state = {
    user: this.props.user,
  };

  setUser = user => {
    this.setState({
      user: user
    });
  };

  render() {
    return (
      <div className="App">
        <Navbar user={this.state.user} clearUser={this.setUser} />

        <Home />

        <Route
          exact
          path="/login"
          render={props => <Login {...props} setUser={this.setUser} />}
        />

        <Route exact path="/profile/:id" render={props => <Profile user={this.state.user} {...props} />} />

        <Route
          exact
          path="/signup"

          render={props => <Signup {...props} setUser={this.setUser} />}
        />

      </div>
    )

  }


}


export default App