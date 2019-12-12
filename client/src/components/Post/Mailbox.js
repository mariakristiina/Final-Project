import Moment from 'react-moment';
import 'moment-timezone';
import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { Link, NavLink, Route } from "react-router-dom";
import MailboxDetail from "./MailboxDetail";
import { getMessages } from "./messageFunctions";
import("./PostCss/mailbox.css");
import("./PostCss/mailboxList.css")

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
        {sentMessages.map(msg => {

          return (
            <div >
              <Link
                to={`/mailbox/detail/${msg._id}`}
                key={msg._id}
                className="list-group-item list-group-item-action mailBox"
              >
                <div>
                  <p>Title: {msg.subject.title}</p>
                  <p>From: {msg.owner.username}</p>
                  <Moment>{msg.date}</Moment>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

    );
  }
}

export default Mailbox;
