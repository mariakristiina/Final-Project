import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const getSentMessages = userId => {
  return axios.get(`/messages/sent/${userId}`);
};

const getReceivedMessages = userId => {
  return axios.get(`/messages/received/${userId}`);
};
class Mailbox extends Component {
  state = {
    receivedMessages: [],
    sentMessages: []
  };

  componentDidMount() {
    getSentMessages(this.props.match.params.user)
      .then(res => {
        this.setState({
          sentMessages: res.data
        });
      })
      .catch(err => console.log(err));

    getReceivedMessages(this.props.match.params.user)
      .then(res => {
        this.setState({
          receivedMessages: res.data
        });
      })
  }

render() {
  const { sentMessages, receivedMessages } = this.state;
  console.log(this.state);
  return (
    <div>
    {sentMessages.map(msg => {
      return (
        <div key={msg._id}>
        <p>From: {msg.owner.username}</p>
        <p>To: {msg.recipient.username}</p>
        <p>Date: {msg.created_at}</p>
        <p>Type: {msg.title}</p>
        <p>Message: {msg.content}</p>
        
        
        
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
        <Button type="submit">Send Message</Button>
        </Form>
        </div>
        );
      })}
      
      {receivedMessages.map(msg => {
        return (
          <div key={msg._id}>
          <p>From: {msg.owner.username}</p>
          <p>To: {msg.recipient.username}</p>
          <p>Date: {msg.created_at}</p>
          <p>Type: {msg.title}</p>
          <p>Message: {msg.content}</p>
          </div>
          )
        }
        )}
      </div>
        );
      }
}

export default Mailbox;
