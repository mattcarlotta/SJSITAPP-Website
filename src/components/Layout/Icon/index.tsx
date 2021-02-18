import * as React from "react";
import styled from "@emotion/styled";
import {
  FaUserCircle,
  FaLock,
  FaBug,
  FaEnvelope,
  FaKey,
  FaCalendarAlt,
  FaIdCard,
  FaIdBadge,
  FaHockeyPuck,
  FaStreetView,
  FaMinusCircle,
  FaTshirt,
  FaStickyNote,
  FaSearch,
  FaTimesCircle
} from "react-icons/fa";
import { MdPersonPin } from "react-icons/md";
import { ChangeEvent, CSSProperties, FC } from "~types";

export type TIconType =
  | "calander"
  | "erase"
  | "id"
  | "key"
  | "location"
  | "lock"
  | "mail"
  | "note"
  | "person"
  | "puck"
  | "remove"
  | "search"
  | "tshirt"
  | "user"
  | "usertag";

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
