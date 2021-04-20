import EditEventForm from "~components/Layout/EditEventForm";
import requiresStaffCredentials from "~containers/App/requiresStaffCredentials";

export default requiresStaffCredentials(EditEventForm);
