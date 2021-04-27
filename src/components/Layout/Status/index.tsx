import * as React from "react";
import Tooltip from "~components/Layout/Tooltip";
import { IconContext, FaCheckCircle, FaTimesCircle } from "~icons";
import { ReactElement } from "~types";

const Status = ({ status }: { status?: boolean }): ReactElement => (
  <Tooltip title={status ? "active" : "deactivated"} placement="top">
    <IconContext.Provider
      value={{
        style: {
          fontSize: 22,
          position: "relative",
          top: "2px"
        }
      }}
    >
      {status ? (
        <FaCheckCircle style={{ color: "#008000" }} />
      ) : (
        <FaTimesCircle style={{ color: "red" }} />
      )}
    </IconContext.Provider>
  </Tooltip>
);

export default Status;
