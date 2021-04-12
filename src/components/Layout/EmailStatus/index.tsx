import * as React from "react";
import Tooltip from "~components/Layout/Tooltip";
import { IconContext, FaStopwatch, FaShareSquare, FaTimes } from "~icons";

export type TEmailStatusProps = {
  status: string;
};

const EmailStatus = ({ status }: TEmailStatusProps): JSX.Element => (
  <Tooltip
    title={status}
    placement="top"
    styles={{ textAlign: "center", width: "100%" }}
  >
    <IconContext.Provider
      value={{
        style: {
          fontSize: 22,
          position: "relative",
          top: "2px"
        }
      }}
    >
      {status === "sent" ? (
        <FaShareSquare style={{ color: "#008000" }} />
      ) : status === "unsent" ? (
        <FaStopwatch style={{ color: "#ffa000" }} />
      ) : (
        <FaTimes style={{ color: "red" }} />
      )}
    </IconContext.Provider>
  </Tooltip>
);

export default EmailStatus;
