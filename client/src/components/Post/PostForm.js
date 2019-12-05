import React, { Component } from "react";
import axios from "axios";

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

  handleChange = event => {
    console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state.category);
  };

  handleSubmit = event => {
    event.preventDefault();
     console.log(this.state)
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
        
        this.props.refershData();
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
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={this.handleChange}
          value={this.state.title}
        />

        <label htmlFor="date">Date: </label>
        <input
          type="date"
          name="date"
          id="date"
          onChange={this.handleChange}
          value={this.state.date}
        />

        <label htmlFor="startTime">Start Time: </label>
        <input
          type="time"
          name="startTime"
          id="startTime"
          onChange={this.handleChange}
          value={this.state.startTime}
        />

        <label htmlFor="endTime">End Time: </label>
        <input
          type="time"
          name="endTime"
          id="endTime"
          onChange={this.handleChange}
          value={this.state.endTime}
        />

        <label htmlFor="postType">Post Type: </label>
        <select onChange={this.handleChange} name="postType" id="postType">
          <option value="search">Search</option>
          <option value="offer">Offer</option>
        </select>

        <label htmlFor="category">Category: </label>
        <select onChange={this.handleChange} name="category" id="category">
          <option value="language lessons">Language Lessons</option>
          <option value="tutoring">Tutoring</option>
          <option value="government appointment">Government Appointment</option>
          <option value="doctor appointment">Doctor appointment</option>
          <option value="meet people">Meet People</option>
          <option value="activities for kids">Activities for Kids</option>
          <option value="activities for seniors">Activities for Seniors</option>
        </select>

        <label htmlFor="description">Description: </label>
        <input
          type="text"
          name="description"
          id="description"
          onChange={this.handleChange}
          value={this.state.description}
        />
        <button type="submit">Create a new Post</button>
      </form>
    );
  }
}

export default NewPost;
