import * as React from "react";
import Tooltip from "~components/Layout/Tooltip";
import { FaUser, FaUserTimes } from "~icons";
import { CSSProperties, ReactElement } from "~types";

const activeUserStyle = {
  color: "green",
  position: "relative",
  top: "2px"
} as CSSProperties;
const inactiveUserStyle = {
  fontSize: 22,
  position: "relative",
  top: 5,
  left: 3,
  color: "red"
} as CSSProperties;

const AccountStatus = ({ status }: { status: string }): ReactElement => (
  <Tooltip
    title={status}
    placement="top"
    styles={{ textAlign: "center", width: "100%" }}
  >
    {status === "active" ? (
      <FaUser style={activeUserStyle} />
    ) : (
      <FaUserTimes style={inactiveUserStyle} />
    )}
  </Tooltip>
);

export default React.memo(AccountStatus);
