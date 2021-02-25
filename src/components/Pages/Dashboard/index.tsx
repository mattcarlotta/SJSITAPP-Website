import { Grid } from "@material-ui/core";
import Events from "./Events";
import Forms from "./Forms";

const Dashboard = (): JSX.Element => (
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
);

export default Dashboard;
