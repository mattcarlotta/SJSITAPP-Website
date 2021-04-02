import * as React from "react";
import { connect } from "react-redux";
import Card from "~components/Layout/Card";
import EventCalendar from "~components/Layout/EventCalendar";
import Header from "~components/Navigation/Header";
import { FaCalendar } from "~icons";
import { TRootState } from "~types";

export type TScheduleProps = {
  loggedinUserId: string;
  role: string;
};

export const Schedule = ({
  loggedinUserId,
  role
}: TScheduleProps): JSX.Element => (
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

/* istanbul ignore next */
const mapStateToProps = ({ auth }: Pick<TRootState, "auth">) => ({
  loggedinUserId: auth.id,
  role: auth.role
});

export default connect(mapStateToProps)(Schedule);
