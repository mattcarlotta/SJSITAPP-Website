import EditAPForm from "~components/Layout/EditAPForm";
import requiresStaffCredentials from "~containers/App/requiresStaffCredentials";

export default requiresStaffCredentials(EditAPForm);
