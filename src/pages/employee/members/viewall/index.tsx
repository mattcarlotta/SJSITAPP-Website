import ViewMembers from "~components/Layout/ViewMembers";
import requiresStaffCredentials from "~containers/App/requiresStaffCredentials";

export default requiresStaffCredentials(ViewMembers);
