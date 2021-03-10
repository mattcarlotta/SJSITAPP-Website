import * as React from "react";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import Header from "~components/Navigation/Header";
import Events from "~components/Layout/Dashboard/Events";
import Forms from "~components/Layout/Dashboard/Forms";
import Availability from "~components/Layout/Dashboard/Availability";
import EmployeeAvailability from "~components/Layout/Dashboard/EmployeeAvailability";
import EventDistribution from "~components/Layout/Dashboard/EventDistribution";
import { TRootState } from "~types";

export type TDashboardProps = {
  loggedinUserId: string;
  role: string;
};

export const Dashboard = ({
  loggedinUserId,
  role
}: TDashboardProps): JSX.Element => {
  const isEmployee = role === "employee";
  return (
    <>
      <Header title="Dashboard" url="/dashboard" />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Events loggedinUserId={loggedinUserId} isEmployee={isEmployee} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Forms />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          {isEmployee ? <Availability /> : <EmployeeAvailability />}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <EventDistribution />
        </Grid>
      </Grid>
    </>
  );
};

/* istanbul ignore next */
const mapStateToProps = ({ auth }: Pick<TRootState, "auth">) => ({
  loggedinUserId: auth.id,
  role: auth.role
});

export default connect(mapStateToProps)(Dashboard);
