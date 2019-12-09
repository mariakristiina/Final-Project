import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { Link, NavLink, Route } from "react-router-dom";
import MailboxDetail from "./MailboxDetail";
import { getSentMessages, getReceivedMessages } from "./messageFunctions";
class Mailbox extends Component {
  state = {
    receivedMessages: [],
    sentMessages: [],
    showDetail: false,
    detailMessage: []
  };

  componentDidMount() {
    console.log(this.props.match.params);
    getSentMessages(this.props.user._id)
      .then(res => {
        this.setState({
          sentMessages: res.data
        });
      })
      .catch(err => console.log(err));

    getReceivedMessages(this.props.user._id).then(res => {
      this.setState({
        receivedMessages: res.data
      });
    });
  }

  render() {
    const { sentMessages, receivedMessages } = this.state;
    console.log("tst", sentMessages, receivedMessages);
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          className="col-5"
          style={{
            maxHeight: "90vh",
            overflow: "scroll"
          }}
        >
          <div>
            {sentMessages.map(msg => {
              return (
                <Link to={`/mailbox/detail/${msg._id}`} key={msg._id}>
                  <div>
                    <p>Title: {msg.subject.title}</p>
                    <p>From: {msg.owner.username}</p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* {this.state.showDetail && (
          <MailboxDetail  />
        )} */}
          {/* <div>{this.props.children || <h1>Hi</h1>}</div> */}
        </div>
      </div>
    );
  }
}

export default Mailbox;
