import React from "react";
import { FaCircle } from "~icons";
import { CSSProperties, ReactNode } from "~types";

const iconStyle = {
  margin: "0 5px",
  fontSize: 18,
  position: "relative",
  top: 2
} as CSSProperties;

export type TEventResponse =
  | "I want to work."
  | "Available Games"
  | "Available to work."
  | "Prefer not to work."
  | "Not available to work."
  | "No response."
  | "Scheduled."
  | string
  | undefined;

export const showBadge = (response: TEventResponse): string => {
  switch (response) {
    case "Scheduled Games":
    case "I want to work.": {
      return "#247BA0";
    }
    case "Available Games":
    case "Available to work.": {
      return "#2A9D8F";
    }
    case "Prefer not to work.": {
      return "#F4A261"; // 2A9D8F
    }
    case "Not available to work.": {
      return "#FF8060";
    }
    case "No response.": {
      return "#BFBFBF"; // F4A261
    }
    case "Scheduled.": {
      return "limegreen";
    }
    default: {
      return "transparent";
    }
  }
};

export type TBadgeProps = {
  children: ReactNode;
  response?: TEventResponse;
  style?: CSSProperties;
};

const Badge = ({ children, response, style }: TBadgeProps): JSX.Element => (
  <div style={{ ...style, margin: 0 }}>
    <FaCircle
      style={{
        ...iconStyle,
        color: showBadge(response)
      }}
    />
    <span style={{ position: "relative", top: "-2px" }}>{children}</span>
  </div>
);

export default Badge;
