import * as React from "react";
import Tooltip, { TTooltipPlacement } from "~components/Layout/Tooltip";
import { BiChevronDownSquare } from "~icons";
import { CSSProperties } from "~types";

export type TEmailSendToListProps = {
  emails: Array<string>;
  placement?: TTooltipPlacement;
  styles?: CSSProperties;
  withIcon?: boolean;
};

const EmailSendToList = ({
  emails,
  placement,
  styles,
  withIcon
}: TEmailSendToListProps): JSX.Element => (
  <Tooltip
    title={emails.map(user => (
      <span key={user} style={{ margin: 0, padding: 0 }}>
        &#183; {user}
        <br />
      </span>
    ))}
    placement={placement}
    styles={{
      textAlign: "center",
      width: "100%",
      ...styles
    }}
  >
    <div style={{ textAlign: "center", width: "100%" }}>
      {emails.length > 1
        ? "multiple email addresses"
        : emails[0].replace(/<.+/g, "")}
      {withIcon && (
        <BiChevronDownSquare
          style={{ position: "relative", top: 2, fontSize: 13, marginLeft: 2 }}
        />
      )}
    </div>
  </Tooltip>
);

export default React.memo(EmailSendToList);
