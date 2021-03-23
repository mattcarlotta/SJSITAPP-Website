import FormatDate from "~components/Layout/FormatDate";
import Margin from "~components/Layout/Margin";
import Title from "~components/Layout/Title";
import { FaUser, FaUserTimes } from "~icons";
import { CSSProperties } from "~types";

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

export type TMemberDetails = {
  firstName: string;
  lastName: string;
  registered: string;
  role: string;
  status: string;
};

const MemberDetails = ({
  firstName,
  lastName,
  registered,
  role,
  status
}: TMemberDetails): JSX.Element => (
  <Margin as="div" bottom="20px">
    <Title data-testid="user-name" fontSize="36px" margin="0px">
      {firstName} {lastName}
    </Title>
    <div>
      <strong>Account Status:</strong>&nbsp;
      {status === "active" ? (
        <FaUser style={activeUserStyle} />
      ) : (
        <FaUserTimes style={inactiveUserStyle} />
      )}
      &nbsp;
      <span data-test="user-status">({status})</span>
    </div>
    <Margin as="div" top="5px">
      <strong>Registered:</strong>&nbsp;
      <FormatDate
        date={registered}
        format="MMMM Do, YYYY"
        style={{ display: "inline-block" }}
      />
    </Margin>
    <Margin as="div" top="5px">
      <strong>Role:</strong>&nbsp;
      {role}
    </Margin>
  </Margin>
);

export default MemberDetails;
