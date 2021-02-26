import * as React from "react";
import { Grid } from "@material-ui/core";
import Header from "~components/Navigation/Header";
import Events from "./Events";
import Forms from "./Forms";

const Dashboard = (): JSX.Element => (
  <>
    <Header title="Dashboard" url="/dashboard" />
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
        <Events />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
        <Forms />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
        <Forms />
      </Grid>
    </Grid>
  </>
);

export default Dashboard;
