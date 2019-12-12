import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { Link, NavLink, Route } from "react-router-dom";
import MailboxDetail from "./MailboxDetail";
import { getMessages } from "./messageFunctions";

class Mailbox extends Component {
  state = {
    //receivedMessages: [],
    sentMessages: [],
    showDetail: false,
    detailMessage: []
  };

  componentDidMount() {
    console.log(this.props.match.params);
    getMessages(this.props.user._id)
      .then(res => {
        this.setState({
          sentMessages: res.data
        });
      })
      .catch(err => console.log(err));

    /*getReceivedMessages(this.props.user._id).then(res => {
      this.setState({
        receivedMessages: res.data
      });
    });*/
  }

  render() {
    const { sentMessages, receivedMessages } = this.state;
    console.log("tst", sentMessages, receivedMessages);

    return (
      <div>
        <div
          className="col-5"
          style={{
            maxHeight: "90vh",
            overflow: "scroll"
          }}
        >
          <div>
            {sentMessages.map(msg => {
              console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii", msg);
              return (
                <Link
                  to={`/mailbox/detail/${msg._id}`}
                  key={msg._id}
                  className="list-group-item list-group-item-action"
                >
                  <div>
                    <p>Title: {msg.subject.title}</p>
                    <p>From: {msg.owner.username}</p>
                    <p>Date: {msg.date}</p>
                
                  </div>
                </Link>
              );
            })}
          </div>
          <div></div>
        </div>
      </div>
    );
  }
}

export default Mailbox;
