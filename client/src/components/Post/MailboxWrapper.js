import React from "react";
import Mailbox from "./Mailbox";
import MailboxDetail from "./MailboxDetail";
import { Route } from "react-router-dom";

const MailboxWrapper = props => {
  console.log(props.match.params);
  return (
    <>
      <div className="col-5" style={{ "maxHeight": "90vh", "overflow": "scroll" }}>
        <div className="list-group">
          <Mailbox user={props.user} {...props} />
          </div>
          </div>
          {props.match.params.messageId && (
          <div className="col-7">
            <MailboxDetail user={props.user} {...props} />
            </div>
          )}
    </>
  );
};

export default MailboxWrapper;
