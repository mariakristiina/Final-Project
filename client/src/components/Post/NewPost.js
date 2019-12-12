import React, { Component } from "react";
import axios from "axios";
import("./PostCss/newPost.css");

class NewPost extends Component {
  state = {
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    postType: "",
    category: "",
    description: ""
  };

  handleChangeNewPost = event => {
    // console.log(event.target.value);
    // const { name, value } = event.target

    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmitNewPost = event => {
    event.preventDefault();
    console.log(this.state);
    axios
      .post("/post/new", {
        title: this.state.title,
        startTime: this.state.startTime,
        endTime: this.state.endTime,
        postType: this.state.postType,
        category: this.state.category,
        description: this.state.description
      })
      .then(response => {
        this.props.refreshData();
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

  render() {
    return (
      <div className="formCreate">
        <form onSubmit={this.handleSubmitNewPost} className="createPost">
          <h2 className="createHeading">Create New Post</h2>
          <label className="createPostLabel" htmlFor="title">Post Title </label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={this.handleChangeNewPost}
            value={this.state.title}
          />

          <label className="createPostLabel" htmlFor="date">Available date </label>
          <input
            type="date"
            name="date"
            id="date"
            onChange={this.handleChangeNewPost}
            value={this.state.date}
          />

          <label className="createPostLabel" htmlFor="startTime">Start Time </label>
          <input
            type="time"
            name="startTime"
            id="startTime"
            onChange={this.handleChangeNewPost}
            value={this.state.startTime}
          />

          <label className="createPostLabel" htmlFor="endTime">End Time </label>
          <input
            type="time"
            name="endTime"
            id="endTime"
            onChange={this.handleChangeNewPost}
            value={this.state.endTime}
          />

          <label className="createPostLabel" htmlFor="postType"> Post Type: </label>
          <select 
            onChange={this.handleChangeNewPost}
            name="postType"
            id="postType"
          >
            <option value="select">---</option>
            <option value="search">Search</option>
            <option value="offer">Offer</option>
          </select>

          <label className="createPostLabel" htmlFor="category"> Category </label>
          <select
            onChange={this.handleChangeNewPost}
            name="category"
            id="category"
          >
            <option value="select">---</option>
            <option value="language lessons">Language Lessons</option>
            <option value="tutoring">Tutoring</option>
            <option value="government appointment">
              Government Appointment
            </option>
            <option value="doctor appointment">Doctor appointment</option>
            <option value="meet people">Meet People</option>
            <option value="activities for kids">Activities for Kids</option>
            <option value="activities for seniors">
              Activities for Seniors
            </option>
          </select>

          <label className="createPostLabel" htmlFor="description">Description </label>
          <input className="descriplionBar"
            type="text"
            name="description"
            id="description"
            onChange={this.handleChangeNewPost}
            value={this.state.description}
          />
          <button className="createButton button" type="submit">Create a new Post</button>
        </form>
      </div>
    );
  }
}

export default NewPost;
