import * as React from "react";
import { connect } from "react-redux";
import Card from "~components/Layout/Card";
import CardSubTitle from "~components/Layout/CardSubTitle";
import EventCalendar from "~components/Layout/EventCalendar";
import Header from "~components/Navigation/Header";
import { FaCalendar } from "~icons";
import { TRootState } from "~types";

export type TScheduleProps = {
  loggedinUserId: string;
};

export const Schedule = ({ loggedinUserId }: TScheduleProps): JSX.Element => (
  <>
    <Header title="Schedule" url="/employee/schedule" />
    <Card
      dataTestId="schedule"
      icon={<FaCalendar />}
      title="Schedule"
      padding="0"
    >
      <CardSubTitle>Event Calendar</CardSubTitle>
      <EventCalendar id={loggedinUserId} />
    </Card>
  </>
);

/* istanbul ignore next */
const mapStateToProps = ({ auth }: Pick<TRootState, "auth">) => ({
  loggedinUserId: auth.id
});

export default connect(mapStateToProps)(Schedule);
