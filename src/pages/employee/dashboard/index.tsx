import * as React from "react";
import requiresBasicCredentials from "~containers/App/requiresBasicCredentials";

const Dashboard = () => <div>Dashboard</div>;

export default requiresBasicCredentials(Dashboard);
