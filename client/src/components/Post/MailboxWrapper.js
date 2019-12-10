import React from "react";
import Mailbox from "./Mailbox";
import MailboxDetail from "./MailboxDetail";
import { Route } from "react-router-dom";

const MailboxWrapper = props => {
  console.log(props.match.params);
  return (
    <>
     
      <Mailbox user={props.user} {...props} />
      {props.match.params.messageId && (
        <MailboxDetail user={props.user} {...props} />
      )}
    </>
  );
};

export default MailboxWrapper;
