import ViewMail from "~components/Layout/ViewMail";
import requiresStaffCredentials from "~containers/App/requiresStaffCredentials";

export default requiresStaffCredentials(ViewMail);
