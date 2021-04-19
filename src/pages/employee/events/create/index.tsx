import CreateEventForm from "~components/Layout/CreateEventForm";
import requiresStaffCredentials from "~containers/App/requiresStaffCredentials";

export default requiresStaffCredentials(CreateEventForm);
