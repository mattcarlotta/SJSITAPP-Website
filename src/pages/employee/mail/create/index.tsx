import ComposeMailForm from "~components/Layout/ComposeMailForm";
import requiresStaffCredentials from "~containers/App/requiresStaffCredentials";

export default requiresStaffCredentials(ComposeMailForm);
