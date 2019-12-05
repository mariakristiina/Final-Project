import React from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import { Route } from "react-router-dom";
import Signup from "./components/Signup"
import Login from "./components/Login"
// import { Link, Switch } from "react-router-dom";
import Posts from "./components/Post/Posts";
import NewPost from "./components/Post/PostForm";

import Profile from "./components/Profile";
import Home from "./components/Home";
import PostDetail from "./components/Post/PostDetail"


class App extends React.Component {
  state = {
    user: this.props.user,
    posts: []
  };

  setUser = user => {
    this.setState({
      user: user
    });
  };

  // getData = post => {
  //   axios
  //     .get('/post')
  //     .then(response => {
  //       this.setState({
  //         posts: response.data
  //       })
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // };



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

        <Route exact path="/posts" render={props => <Posts {...props} serUser={this.setUser} />} />

        <Route exact path="/post/:id" render={props => <PostDetail {...props} post={this.state.posts} />} />

        <Route exact path="/post/new" render={props => <NewPost {...props} setUser={this.setUser} handleChange={this.handleChange} />} />

      </div>
    )

  }


}


export default App