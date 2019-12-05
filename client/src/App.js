import React from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import { Route } from "react-router-dom";
import Signup from "./components/Signup"
import Login from "./components/Login"
// import { Link, Switch } from "react-router-dom";
import Profile from "./components/Profile";
import Posts from "./components/Post/Posts";
import NewPost from "./components/Post/PostForm";



class App extends React.Component {
  state = {
    user: this.props.user
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

        <Route exact path="/post" render={props => <Posts {...props} serUser={this.setUser} /> } />

<Route exact path="/post/new" render={props => <NewPost {...props} setUser={this.setUser} handleChange={this.handleChange}/> } />

      </div>
    )

  }


}


export default App