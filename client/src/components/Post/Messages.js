import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ("./PostCss/postDetail.css")


class Messages extends Component {
  state = {
    title: "",
    content: ""
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    axios
      .post("/messages", {
        title: this.state.title,
        content: this.state.content,
        subject: this.props.subject,
        owner: this.props.owner,
        recipient: this.props.recipient
      })
      .then(response => {
        console.log(response);
        this.props.history.push(`/mailbox/${this.props.owner._id}`);
      });
  };

  // myFunction() {
  //   alert("Message successfully sent!");
  // }

  render() {
    return (
      <div className="messageContainer">
        <Form onSubmit={this.handleSubmit}>
         
         <div className="part">
            <label className="messageLabel">Write a Message</label>
            </div>
            <div className="part">
            <input className="messageInput"
              as="textarea"
              rows="3"
              name="content"
              onChange={this.handleChange}
            />
        </div>
        <div className="part">
          <button className="button messageButton" onClick={this.myFunction}>Send</button>
          </div>
        </Form>
      </div>
    );
  }
}

export default Messages;
