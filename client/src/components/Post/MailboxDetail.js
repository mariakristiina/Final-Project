import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReplyMailbox from "./ReplyMailbox";

class MailboxDetail extends Component {
  state = {
    post: null,
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
        title: this.state.post.title,
        content: this.state.content,
        subject: this.state.post._id,
        owner: this.state.post.owner._id,
        recipient: this.state.post.owner._id
      })
      .then(response => {
        console.log(response);
        this.props.history.push(`/mailbox/${this.state.post.owner._id}`);
      });
  };

  getMailboxDetail() {
    const id = this.props.match.params.messageId;
    console.log(id);
    axios
      .get(`/messages/detail/${id}`)
      .then(response => {
        console.log(response.data);
        this.setState({
          post: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getMailboxDetail();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.getMailboxDetail();
    }
  }

  render() {
    if (this.state.post === null) {
      return <div></div>;
    }

    const messages = this.state.post.messages.map(message => {
      return (
        <div style={{ marginTop: "-20em", marginLeft: "40%" }}>
          <p>{message.content}</p>
          <p>Created at: {message.created_at}</p>
        </div>
      );
    });

    return (
      <div>
        {messages}
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Your Message</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              name="content"
              onChange={this.handleChange}
            />
            <button>Send Message</button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default MailboxDetail;
