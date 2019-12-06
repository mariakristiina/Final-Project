import React from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import { Route, Switch } from "react-router-dom";
import Signup from "./components/Signup"
import Login from "./components/Login"
// import { Link, Switch } from "react-router-dom";
import Posts from "./components/Post/Posts";
import NewPost from "./components/Post/NewPost";

import Profile from "./components/Profile";
import Home from "./components/Home";
import PostDetail from "./components/Post/PostDetail"
import axios from "axios";

class App extends React.Component {
  state = {
    user: this.props.user,
    posts: [],
    profile: {
      error: "",
      username: "",
      urlPath: "https://res.cloudinary.com/mariakristiina/image/upload/v1575542831/avatar-orange_q8rkfz.png",
      age: "",
      gender: "",
      languages: [],
      about: ""
    },
    editProfileForm: false,
    newPost: {
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      postType: "",
      category: "",
      description: ""
    },
    postDetail: {
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      postType: "",
      category: "",
      description: "",
      owner: "",
      match: "",
      messages: ""
    }
  };

  // =================== user functions
  setUser = user => {
    this.setState({
      user: user
    });
  };

  //-----------------------Profile func------------

  getDataProfile = () => {

    const id = this.state.user._id

    axios
      .get(`/profile/${id}`)
      .then(response => {
        console.log(response.data);
        this.setState({
          profile: {
          username: response.data.username,
          age: response.data.age,
          gender: response.data.gender,
          languages: response.data.languages,
          about: response.data.about,
          urlPath: response.data.urlPath
          }
        },()=>console.log("state after data call", this.state));
      })
      .catch(err => {
        if (err.response.status === 404) {
          this.setState({
            error: err.response.data.message
          });
        }
      })
  };


  handleChangeProfile = event => {
    const {name,value} =event.target
    this.setState({
   profile:{...this.state.profile,[name]: value}
    });
  };

  toggleEditProfile = () => {
    console.log(this.state.editProfileForm)
    this.setState({
      editProfileForm: !this.state.editProfileForm
    });
  };

  handleSubmitProfile = event => {
    event.preventDefault();

    const id = this.state.user._id;
    const {username,age,gender,languages,about,urlPath}=this.state.profile
    axios
      .put(`/profile/${id}`, {
        username,
        age,
        gender,
        languages,
        about,
        urlPath
      })
      .then(response => {
        this.setState({
          profile: response.data,
          editProfileForm: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  imageUpload = event => {
    console.log(event.target.files[0]);
    const file = event.target.files[0];
    let upload = new FormData();
    console.log(upload)
    const id = this.state.user._id;

    upload.append("urlPath", file);
    axios.post(`/profile/${id}`, upload)
    .then(response => {
      console.log(response.data.secure_url)
      this.setState({
        profile: {
          ...this.state.profile,
          urlPath: response.data.secure_url }
      });
      console.log(this.state.profile.urlPath)
    });
  }

  //============================ posts functions
  getDataPosts = () => {
    axios
      .get('/post')
      .then(response => {
        console.log(response.data)
        this.setState({
          posts: response.data
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  //=============================== postForm functions

  handleChangeNewPost = event => {
    console.log(event.target.value);
    const { name, value } = event.target

    this.setState({
      newPost: { [name]: value }
    });
  };

  handleSubmitNewPost = event => {
    event.preventDefault();
    console.log(this.state);
    axios
      .post("/post/new", {
        title: this.state.newPost.title,
        startTime: this.state.newPost.startTime,
        endTime: this.state.newPost.endTime,
        postType: this.state.newPost.postType,
        category: this.state.newPost.category,
        description: this.state.newPost.description
      })
      .then(response => {
        response.refreshData();
        this.setState({
          title: "",
          startTime: "",
          endTime: "",
          postType: "",
          category: "",
          description: ""
        });
      })
      .catch(err => {
        console.log(err);
      });
  };


// POST detail functions


componentDidMount() {
  this.getDataProfile();
}

  render() {
    return (
      <div className="App">
        <Navbar user={this.state.user} clearUser={this.setUser} />

        <Route exact path="/" component={Home} />

        <Route
          exact
          path="/login"
          render={props => <Login {...props} setUser={this.setUser} />}
        />

        <Route exact path="/profile/:id" render={props => <Profile user={this.state.user} 
        profile={this.state.profile} 
        handleChangeProfile={this.handleChangeProfile} toggleEditProfile={this.toggleEditProfile} 
        handleSubmitProfile={this.handleSubmitProfile}
        getDataProfile={this.getDataProfile}
        imageUpload={this.imageUpload}
        editProfileForm={this.state.editProfileForm}
        {...props} />} />

        <Route
          exact
          path="/signup"

          render={props => <Signup {...props} setUser={this.setUser} />}
        />

        <Route exact path="/posts" render={props => <Posts {...props}
          setUser={this.setUser}
          posts={this.state.posts}
          getDataPosts={this.getDataPosts}
        />} />

        <Route exact path="/post/:id" render={props => <PostDetail {...props}
          user={this.state.user}
          postDetail={this.state.posts}

        />} />

        <Route exact path="/post/new" render={props => <NewPost {...props}
          setUser={this.setUser}
          handleChangeNewPost={this.handleChangeNewPost}
          handleSubmitNewPost={this.handleSubmitNewPost}

        />} />

      </div>
    )

  }


}


export default App

