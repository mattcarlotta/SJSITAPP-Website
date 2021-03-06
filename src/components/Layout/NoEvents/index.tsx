import { MdEvent, MdEventNote } from "~icons";
import FlexCenter from "~components/Layout/FlexCenter";
import Center from "~components/Layout/Center";
import { CSSProperties } from "~types";

export type TNoEventsProps = {
  today?: boolean;
};

const iconStyle = {
  fontSize: 70
} as CSSProperties;

const NoEvents = ({ today }: TNoEventsProps): JSX.Element => (
  <FlexCenter
    data-testid="no-events"
    height="135px"
    direction="column"
    justify="center"
    style={{ color: "#999" }}
  >
    <div data-testid="no-events-icon">
      {!today ? (
        <MdEventNote style={iconStyle} />
      ) : (
        <MdEvent style={iconStyle} />
      )}
    </div>
    <Center data-testid="no-events-message">
      {!today
        ? "You don't have any upcoming scheduled events"
        : "No events today"}
    </Center>
  </FlexCenter>
);

export default NoEvents;
