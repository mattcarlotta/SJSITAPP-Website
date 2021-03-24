// import { css } from "@emotion/react";
import DisabledInput from "~components/Layout/DisabledInput";
import FormatDate from "~components/Layout/FormatDate";
import Margin from "~components/Layout/Margin";
import { FaIdBadge, FaUser, FaUserTimes, MdAccessTime } from "~icons";
import { CSSProperties } from "~types";

const activeUserStyle = {
  color: "green",
  position: "relative",
  top: "2px",
  marginRight: 8
} as CSSProperties;

const inactiveUserStyle = {
  fontSize: 22,
  position: "relative",
  top: 5,
  left: 3,
  color: "red",
  marginRight: 8
} as CSSProperties;

const iconStyles = {
  position: "relative",
  top: 3,
  marginRight: 8,
  color: "#888"
} as CSSProperties;

export type TMemberDetails = {
  editRole?: boolean;
  registered: string;
  role: string;
  status: string;
};

const MemberDetails = ({
  editRole,
  registered,
  role,
  status
}: TMemberDetails): JSX.Element => (
  <div data-testid="member-details" style={{ color: "#010404" }}>
    <div data-testid="member-status">
      <div>Account Status</div>
      <DisabledInput>
        {status === "active" ? (
          <FaUser style={activeUserStyle} />
        ) : (
          <FaUserTimes style={inactiveUserStyle} />
        )}
        {status}
      </DisabledInput>
    </div>
    <Margin as="div" top="20px" bottom="20px">
      <div>Registered</div>
      <DisabledInput>
        <MdAccessTime style={iconStyles} />
        <FormatDate
          date={registered}
          format="MMMM Do, YYYY @ hh:mma"
          style={{ display: "inline-block" }}
        />
      </DisabledInput>
    </Margin>
    {!editRole && (
      <Margin data-testid="member-role" as="div" bottom="20px">
        <div>Role</div>
        <DisabledInput>
          <FaIdBadge style={iconStyles} />
          {role}
        </DisabledInput>
      </Margin>
    )}
  </div>
);

export default MemberDetails;
