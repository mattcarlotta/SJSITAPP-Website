import EventScheduleForm from "~components/Layout/EventScheduleForm";
import requiresStaffCredentials from "~containers/App/requiresStaffCredentials";

export default requiresStaffCredentials(EventScheduleForm);
