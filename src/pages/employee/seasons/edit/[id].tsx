import EditSeasonForm from "~components/Layout/EditSeasonForm";
import requiresStaffCredentials from "~containers/App/requiresStaffCredentials";

export default requiresStaffCredentials(EditSeasonForm);
