import React from "react";
import styled from "@emotion/styled";
import Badge from "~components/Layout/Badge";
import ColumnTitle from "~components/Layout/ColumnTitle";
import { CSSProperties } from "~types";

export type TLegendProps = {
  className?: string;
  style?: CSSProperties;
};

const LegendComponent = ({ className, style }: TLegendProps): JSX.Element => (
  <div className={className} style={style}>
    <ColumnTitle
      style={{
        marginBottom: 5,
        background: "#0d6472"
      }}
    >
      Legend
    </ColumnTitle>
    {[
      "I want to work.",
      "Available to work.",
      "Prefer not to work.",
      "Not available to work.",
      "No response."
    ].map(response => (
      <Badge
        key={response}
        response={response}
        style={{ fontSize: 17, textAlign: "left" }}
      >
        {response}
      </Badge>
    ))}
  </div>
);

const Legend = styled(LegendComponent)`
  @media (max-width: 1280px) {
    width: 98.5%;
  }
  width: 225px;
  padding: 10px;
  margin-left: 5px;
  margin-bottom: 10px;
  background: #ebecf0;
  border-radius: 10px;
`;

export default Legend;
