import * as React from "react";
import styled from "@emotion/styled";
import { FaUserCircle } from "@react-icons/all-files/fa/FaUserCircle";
import { FaLock } from "@react-icons/all-files/fa/FaLock";
import { FaBug } from "@react-icons/all-files/fa/FaBug";
import { FaEnvelope } from "@react-icons/all-files/fa/FaEnvelope";
import { FaKey } from "@react-icons/all-files/fa/FaKey";
import { FaCalendarAlt } from "@react-icons/all-files/fa/FaCalendarAlt";
import { FaIdCard } from "@react-icons/all-files/fa/FaIdCard";
import { FaIdBadge } from "@react-icons/all-files/fa/FaIdBadge";
import { FaHockeyPuck } from "@react-icons/all-files/fa/FaHockeyPuck";
import { FaStreetView } from "@react-icons/all-files/fa/FaStreetView";
import { FaMinusCircle } from "@react-icons/all-files/fa/FaMinusCircle";
import { FaTshirt } from "@react-icons/all-files/fa/FaTshirt";
import { FaStickyNote } from "@react-icons/all-files/fa/FaStickyNote";
import { FaSearch } from "@react-icons/all-files/fa/FaSearch";
import { FaTimesCircle } from "@react-icons/all-files/fa/FaTimesCircle";
import { MdPersonPin } from "@react-icons/all-files/md/MdPersonPin";
import { ChangeEvent, CSSProperties, FC, TIconType } from "~types";

export interface IIconProps {
  className?: string;
  dataTestId: string;
  type?: TIconType;
  onClick?: (e: ChangeEvent<any>) => void;
  style?: CSSProperties;
}

const icons = (type?: TIconType): JSX.Element => {
  switch (type) {
    case "calander": {
      return <FaCalendarAlt />;
    }
    case "erase": {
      return <FaTimesCircle />;
    }
    case "id": {
      return <FaIdCard />;
    }
    case "key": {
      return <FaKey />;
    }
    case "location": {
      return <FaStreetView />;
    }
    case "lock": {
      return <FaLock />;
    }
    case "mail": {
      return <FaEnvelope />;
    }
    case "note": {
      return <FaStickyNote />;
    }
    case "person": {
      return <MdPersonPin />;
    }
    case "puck": {
      return <FaHockeyPuck />;
    }
    case "remove": {
      return <FaMinusCircle />;
    }
    case "search": {
      return <FaSearch />;
    }
    case "tshirt": {
      return <FaTshirt />;
    }
    case "user": {
      return <FaUserCircle />;
    }
    case "usertag": {
      return <FaIdBadge />;
    }
    default: {
      return <FaBug />;
    }
  }
};

const IconComponent: FC<IIconProps> = ({
  className,
  dataTestId,
  onClick,
  style,
  type
}) => (
  <i
    role="presentation"
    aria-hidden="true"
    className={className}
    data-testid={dataTestId}
    onClick={onClick}
    style={style}
    tabIndex={0}
  >
    {icons(type)}
  </i>
);

const Icon = styled(IconComponent)<{ color?: string; onHoverColor?: string }>`
  display: flex;
  position: absolute;
  padding-left: 16px;
  transition: all 0.3s ease-in-out;
  z-index: 1;

  svg {
    color: ${({ color }) => color || "#d3dce6"};

    &:hover {
      color: ${({ onHoverColor }) => onHoverColor || "#d3dce6"};
    }
  }

  &:focus {
    outline: 0;
  }
`;

export default Icon;
