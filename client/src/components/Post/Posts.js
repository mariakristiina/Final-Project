//state: [] ****************DONE

//setState: api call get posts **************DONE

//filter for categories, date, owner, match

import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PostList from "./PostList";

class Posts extends Component {
  state = {
    posts: [],
    newPost: {
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      postType: "",
      category: "",
      description: ""
    },
    search: "",
    category: "",
    owner: false,
    match: false
  };

  //============================ posts functions
  getDataPosts = () => {
    axios
      .get('/post')
      .then(response => {
        console.log(response.data)
        this.setState({
          posts: [...response.data]
        })
      })
      .catch(err => {
        console.log(err);
      })
  };

  componentDidMount() {
    this.getDataPosts();
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

  //=============================== filterForm functions


  handleChangeFilter = event => {
    this.setState({
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value
    });
  };


  render() {
    const search = this.state.search.toLowerCase();

    const filteredPosts = this.state.posts.filter(post => {
      console.log(post.category);
      console.log("category from state: ", this.state.category)
      return (
        ((this.state.owner && post.owner._id === this.props.user._id) ||
          (this.state.match && post.match._id === this.props.user._id)) &&
        (post.title.toLowerCase().includes(search) ||
          post.category.toLowerCase().includes(search)) ||
        (this.state.category === post.category || !this.state.category)
      );
    });

    return (
      <div className="post-container">

        <input
          type="text"
          name="search"
          value={this.state.search}
          onChange={this.handleChangeFilter}
          placeholder="search"
        />
        <br />
        <label htmlFor="owner">My Posts</label>
        <input
          type="checkbox"
          name="owner"
          id="owner"
          onChange={this.handleChangeFilter}
          checked={this.state.owner}
        />
        <label htmlFor="match">Matched posts</label>
        <input
          type="checkbox"
          name="match"
          id="match"
          onChange={this.handleChangeFilter}
          checked={this.state.match}
        />
        <label htmlFor="category">Filter by Category</label>
        <select
          name="category"
          id="category"
          value={this.state.category}
          onChange={this.handleChangeFilter}
        >
          <option value="">--</option>
          <option value="language lessons">Language lessons</option>
          <option value="tutoring">Tutoring</option>
          <option value="government appointment">Government appointment</option>
          <option value="doctor appointment">Doctor appointment</option>
          <option value="meet people">Meet people</option>
          <option value="activities for kids">Activities for kids</option>
          <option value="activities for seniors">Activities for seniors</option>
        </select>


        <PostList posts={filteredPosts} />

        <Link to={`/post/new`}>Create a new post
              </Link>
      </div>
    )
  }


}



export default Posts;

