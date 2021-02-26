import { MdEvent, MdEventNote } from "~icons";
import FlexCenter from "~components/Layout/FlexCenter";
import Center from "~components/Layout/Center";

export type TNoEventsProps = {
  today?: boolean;
};

const NoEvents = ({ today }: TNoEventsProps): JSX.Element => (
  <FlexCenter
    direction="column"
    justify="center"
    style={{ color: "#999", height: "85%" }}
  >
    <div data-testid="no-events">
      {!today ? (
        <MdEventNote style={{ fontSize: 70 }} />
      ) : (
        <MdEvent style={{ fontSize: 70 }} />
      )}
    </div>
    <Center>
      {!today
        ? "You don't have any upcoming scheduled events"
        : "No events today"}
    </Center>
  </FlexCenter>
);

export default NoEvents;
