import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class MailboxDetail extends Component {
  state = {
    message: null
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

  componentDidMount() {
    this.getMailboxDetail();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.getMailboxDetail();
    }
  }

  render() {
    console.log(this.state)
    if (this.state.message === null) {
      return <div></div>;
    }
    return <div>{this.state.message.subject.title}</div>;
  }
}

export default MailboxDetail;
