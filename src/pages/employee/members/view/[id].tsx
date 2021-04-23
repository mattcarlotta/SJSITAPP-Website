import ViewMember from "~components/Layout/ViewMember";
import requiresStaffCredentials from "~containers/App/requiresStaffCredentials";

export default requiresStaffCredentials(ViewMember);
