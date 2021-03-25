import * as React from "react";
import { css } from "@emotion/react";
import FormatDate from "~components/Layout/FormatDate";
import Team from "~components/Layout/Team";
import { CSSProperties } from "~types";

export type TEventLabelProps = {
  eventDate: string;
  eventType: string;
  opponent?: string;
  style?: CSSProperties;
  team: string;
};

const EventLabel = ({
  eventType,
  eventDate,
  opponent,
  style,
  team
}: TEventLabelProps): JSX.Element => (
  <div style={style}>
    <div
      css={css`
        display: inline-block;
        margin-right: 10px;
        margin-top: 10px;
      `}
    >
      <Team folder="lowres" team={team} />
      {opponent && (
        <>
          <span style={{ margin: "0 5px" }}>vs.</span>
          <Team folder="lowres" team={opponent} />
          &nbsp;
        </>
      )}
      ({eventType})
    </div>
    <div
      css={css`
        display: inline-block;
        margin-right: 10px;
      `}
    >
      &#8212;
    </div>
    <div
      css={css`
        display: inline-block;
      `}
    >
      <FormatDate
        style={{ display: "inline" }}
        format="ddd, MMMM Do @ h:mm a"
        date={eventDate}
      />
    </div>
  </div>
);

export default EventLabel;
