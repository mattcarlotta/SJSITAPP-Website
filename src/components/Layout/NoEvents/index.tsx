import { css } from "@emotion/react";
import { MdEvent, MdEventNote } from "~icons";
import FlexCenter from "~components/Layout/FlexCenter";

export type TNoEventsProps = {
  today?: boolean;
};

const NoEvents = ({ today }: TNoEventsProps): JSX.Element => (
  <FlexCenter direction="column" style={{ color: "#909090", marginTop: 15 }}>
    <p
      data-testid="no-events"
      css={css`
        margin: 0;
        padding: 20px 0 0;
      `}
    >
      {!today ? (
        <MdEventNote style={{ fontSize: 70 }} />
      ) : (
        <MdEvent style={{ fontSize: 70 }} />
      )}
    </p>
    <p
      css={css`
        margin: 0;
        padding: 0;
        text-align: center;
      `}
    >
      {!today
        ? "You don't have any upcoming scheduled events"
        : "No events today"}
    </p>
  </FlexCenter>
);

export default NoEvents;
