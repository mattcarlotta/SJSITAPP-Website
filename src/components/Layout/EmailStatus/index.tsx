import * as React from "react";
import Tooltip from "~components/Layout/Tooltip";
import { IconContext, FaShareSquare, FaStopwatch } from "~icons";

const EmailReminders = ({ status }: { status: boolean }): JSX.Element => (
  <Tooltip title={status ? "sent" : "unsent"} placement="top">
    <span data-test={status}>
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
          <FaShareSquare style={{ color: "#008000" }} />
        ) : (
          <FaStopwatch style={{ color: "#ffa000" }} />
        )}
      </IconContext.Provider>
    </span>
  </Tooltip>
);

export default React.memo(EmailReminders);
