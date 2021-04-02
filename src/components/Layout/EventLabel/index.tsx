import * as React from "react";
import { css } from "@emotion/react";
import FormatDate from "~components/Layout/FormatDate";
import Padding from "~components/Layout/Padding";
import Margin from "~components/Layout/Margin";
import Team from "~components/Layout/Team";
import { weekdateTimeFormat } from "~utils/dateFormats";
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
  <Padding bottom="5px" style={style}>
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
          <Margin left="10px" right="10px">
            vs.
          </Margin>
          <Team folder="lowres" team={opponent} />
        </>
      )}
    </div>
    <Padding top="10px" bottom="10px" style={{ fontSize: 20 }}>
      <FormatDate
        style={{ display: "inline" }}
        format={weekdateTimeFormat}
        date={eventDate}
      />
      &nbsp; ({eventType})
    </Padding>
  </Padding>
);

export default EventLabel;
