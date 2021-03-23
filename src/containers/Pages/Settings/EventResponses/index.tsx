import EventCalendar from "~components/Layout/EventCalendar";

const EventResponses = ({ id }: { id: string }): JSX.Element => (
  <EventCalendar APIURL="responses" id={id} />
);

export default EventResponses;
