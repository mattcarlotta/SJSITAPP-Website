import CreateMemberForm from "~components/Layout/CreateMemberForm";
import requiresStaffCredentials from "~containers/App/requiresStaffCredentials";

export default requiresStaffCredentials(CreateMemberForm);
