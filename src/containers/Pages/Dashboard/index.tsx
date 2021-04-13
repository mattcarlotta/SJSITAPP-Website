import * as React from "react";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import Events from "~components/Layout/Dashboard/Events";
import Forms from "~components/Layout/Dashboard/Forms";
import Availability from "~components/Layout/Dashboard/Availability";
import EmployeeAvailability from "~components/Layout/Dashboard/EmployeeAvailability";
import EventDistribution from "~components/Layout/Dashboard/EventDistribution";
import Header from "~components/Navigation/Header";
import { ConnectedProps, PickReduxState } from "~types";

/* istanbul ignore next */
const mapState = ({ auth }: PickReduxState<"auth">) => ({
  loggedinUserId: auth.id,
  role: auth.role
});

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>;

export const Dashboard = ({
  loggedinUserId,
  role
}: PropsFromRedux): JSX.Element => {
  const isMember = role === "member";
  return (
    <>
      <Header title="Dashboard" url="/employee/dashboard" />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Events loggedinUserId={loggedinUserId} isMember={isMember} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Forms />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          {isMember ? <Availability /> : <EmployeeAvailability />}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <EventDistribution />
        </Grid>
      </Grid>
    </>
  );
};

export default connector(Dashboard);
