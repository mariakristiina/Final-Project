//state: [] ****************DONE

//setState: api call get posts **************DONE

//filter for categories, date, owner, match

import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PostList from "./PostList";
import NewPost from "./NewPost";

class Posts extends Component {
  state = {
    posts: [],
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
          posts: response.data
        })
      })
      .catch(err => {
        console.log(err);
      })
  };

  componentDidMount() {
    this.getDataPosts();
  }

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

    const filteredPosts = this.state.posts.filter(post => {
      console.log("user id from app: ", this.props.user._id);
      console.log("post owner: ", post.owner._id);

      return (
        (((!this.state.owner) ||
          (this.state.owner && post.owner._id === this.props.user._id)) &&
          (this.state.category === post.category || !this.state.category))
        &&
        (this.state.category === post.category || !this.state.category)
      );
    });

    return (
      <div className="post-container">

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

        <NewPost
          refreshData={this.getDataPosts}
        />
      </div>
    )
  }


}



export default Posts;

