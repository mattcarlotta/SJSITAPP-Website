import * as React from "react";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import Header from "~components/Navigation/Header";
import Events from "~components/Layout/Dashboard/Events";
import Forms from "~components/Layout/Dashboard/Forms";
import Availability from "~components/Layout/Dashboard/Availability";
import { TRootState } from "~types";

export type TDashboardProps = {
  loggedinUserId: string;
};

export const Dashboard = ({ loggedinUserId }: TDashboardProps): JSX.Element => (
  <>
    <Header title="Dashboard" url="/dashboard" />
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
        <Events loggedinUserId={loggedinUserId} />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
        <Forms />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
        <Availability />
      </Grid>
    </Grid>
  </>
);

/* istanbul ignore next */
const mapStateToProps = ({ auth }: Pick<TRootState, "auth">) => ({
  loggedinUserId: auth.id
});

export default connect(mapStateToProps)(Dashboard);
