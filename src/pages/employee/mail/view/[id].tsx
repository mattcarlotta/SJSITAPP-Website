import ViewEmail from "~components/Layout/ViewEmail";
import requiresStaffCredentials from "~containers/App/requiresStaffCredentials";

export default requiresStaffCredentials(ViewEmail);
