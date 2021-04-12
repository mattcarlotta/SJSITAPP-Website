import * as React from "react";
import Tooltip from "~components/Layout/Tooltip";

export type TEmailSendToListProps = {
  emails: Array<string>;
};

const EmailSendToList = ({ emails }: TEmailSendToListProps): JSX.Element => (
  <Tooltip
    title={emails.map(user => (
      <span key={user} style={{ margin: 0, padding: 0 }}>
        &#183; {user}
        <br />
      </span>
    ))}
    placement="top"
    styles={{ textAlign: "center", width: "100%" }}
  >
    <div style={{ textAlign: "center", width: "100%" }}>
      {emails.length > 1
        ? "multiple email addresses"
        : emails[0].replace(/<.+/g, "")}
    </div>
  </Tooltip>
);

export default React.memo(EmailSendToList);
