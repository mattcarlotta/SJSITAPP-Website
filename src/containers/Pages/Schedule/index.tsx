import * as React from "react";
import { connect } from "react-redux";
import Card from "~components/Layout/Card";
import EventCalendar from "~components/Layout/EventCalendar";
import Header from "~components/Navigation/Header";
import { FaCalendar } from "~icons";
import { ConnectedProps, PickReduxState, ReactElement } from "~types";

/* istanbul ignore next */
const mapState = ({ auth }: PickReduxState<"auth">) => ({
  loggedinUserId: auth.id,
  role: auth.role
});

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>;

export const Schedule = ({
  loggedinUserId,
  role
}: PropsFromRedux): ReactElement => (
  <>
    <Header title="Schedule" url="/employee/schedule" />
    <Card
      dataTestId="schedule"
      icon={<FaCalendar />}
      title="Schedule"
      subtitle="Event Calendar"
    >
      <EventCalendar
        APIURL="schedule"
        id={loggedinUserId}
        disableGames={role !== "member"}
      />
    </Card>
  </>
);

export default connector(Schedule);
