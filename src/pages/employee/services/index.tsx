import ViewServices from "~components/Layout/ViewServices";
import requiresStaffCredentials from "~containers/App/requiresStaffCredentials";

export default requiresStaffCredentials(ViewServices);
