import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReplyMailbox from "./ReplyMailbox";

class MailboxDetail extends Component {
  state = {
    message: null,
    content: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
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
          message: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleSubmit = event => {
    event.preventDefault();
    const id = this.props.match.params.messageId;

    axios
      .post("/messages/add", {
        id: id,
        content: this.state.content,
        subject: this.state.message.subject._id,
        owner: this.state.message.owner._id,
        recipient: this.state.message.recipient._id
      })
      .then(message => {
        console.log(message);
        this.setState({
          content: ""
        });
        this.getMailboxDetail();
        //this.props.history.push(`/mailbox/${this.state.post.owner._id}`);
      });
  };

  componentDidMount() {
    this.getMailboxDetail();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.getMailboxDetail();
    }
  }

  render() {
    if (this.state.message === null) {
      return <div></div>;
    }

    let comments = this.state.message.comments.map(comment => {
      return <div>{comment.content}</div>;
    });

    return (
      <div style={{ marginLeft: "40%" }}>
        <p>{this.state.message.content}</p>
        <p>Created at: {this.state.message.created_at}</p>

        {comments}

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
