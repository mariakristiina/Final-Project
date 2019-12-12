import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReplyMailbox from "./ReplyMailbox";
import("./PostCss/mailbox.css");



class MailboxDetail extends Component {
  state = {
    message: null,
    content: "",
    comment: ""
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
          message: response.data,
          comment: response.data
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
          content: "",
        });
        this.getMailboxDetail();
        //this.props.history.push(`/mailbox/${this.state.post.owner._id}`);
      });
  };


  componentDidMount() {
    this.getMailboxDetail();
  }

  // getCommentDetail() {
  //   const id = this.state.message.comments;
  //   console.log(this.state.message.comments)
  //   console.log(id);
  //   axios
  //     .get(`/messages/detail/comment${id}`)
  //     .then(response => {
  //       console.log(response.data);
  //       this.setState({
  //         comment: response.data
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.getMailboxDetail();
      // this.getCommentDetail();
    }
  }

  render() {
    if (this.state.message === null) {
      return <div></div>;
    }

    let comments = this.state.message.comments.map(comment => {
      console.log(comment.subject)
      console.log(this.state.message)
      return (
        <div className="comments">
          <p>Date: {comment.created_at}</p>
          {/* <p>Message from: {this.state.message.recipient.username}</p> */}
          <p>{comment.content}</p>
        </div>

      )
    });

    return (

      <div>
        <p className="profLabel">Your conversation with {this.state.message.owner.username}</p>
        <div className="comments">
          <p>Date: {this.state.message.created_at}</p>
          <p>Message: {this.state.message.content}</p>
        </div>

        {comments}

        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label className="profLabel">Answer</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              name="content"
              onChange={this.handleChange}
            />
            <button className="button profButton">Send your answer</button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default MailboxDetail;


// style={{ marginLeft: "40%" }}