import React from "react";
import Mailbox from "./Mailbox";
import MailboxDetail from "./MailboxDetail";
import { Route } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import("./PostCss/mailbox.css");

const MailboxWrapper = props => {
  console.log(props.match.params);
  return (
    <>
      <Container className="container">
        <Row classname="row" >
          <Col className="inbox" sm={4} style={{ "maxHeight": "90vh", "overflow": "scroll" }}>
            <div>
              <Mailbox user={props.user} {...props} />
            </div>
          </Col>
          {props.match.params.messageId && (
            <div className="detail" sm={8} >
              <MailboxDetail user={props.user} {...props} />
            </div>
          )}
        </Row>
      </Container>
    </>
  );
};

export default MailboxWrapper;
