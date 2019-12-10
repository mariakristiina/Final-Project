import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";


class ReplyMailbox extends Component {
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
        this.props.history.push(`/mailbox/${this.props.recipient._id}`);
      });
  };

  myFunction() {
    alert("Message successfully sent!");
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Your Message</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              name="content"
              onChange={this.handleChange}
            />
          </Form.Group>
          <button onClick={this.myFunction}>Send Message</button>
        </Form>
      </div>
    );
  }
}

export default ReplyMailbox;
