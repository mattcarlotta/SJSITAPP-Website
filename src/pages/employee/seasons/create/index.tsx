import CreateSeasonForm from "~components/Layout/CreateSeasonForm";
import requiresStaffCredentials from "~containers/App/requiresStaffCredentials";

export default requiresStaffCredentials(CreateSeasonForm);
