import * as React from "react";
import Tooltip from "~components/Layout/Tooltip";
import { FaUserCheck, FaUserClock } from "~icons";
import { CSSProperties, ReactElement } from "~types";

const iconStyle = {
  fontSize: 22,
  position: "relative",
  top: "2px"
} as CSSProperties;

const activeUserStyle = { ...iconStyle, color: "#008000" };
const inactiveUserStyle = { ...iconStyle, color: "#FFA000" };

const TokenStatus = ({ email }: { email?: string }): ReactElement => (
  <Tooltip
    title={email ? "registered" : "unregistered"}
    placement="top"
    styles={{ textAlign: "center", width: "100%" }}
  >
    {email ? (
      <FaUserCheck style={activeUserStyle} />
    ) : (
      <FaUserClock style={inactiveUserStyle} />
    )}
  </Tooltip>
);

export default React.memo(TokenStatus);
