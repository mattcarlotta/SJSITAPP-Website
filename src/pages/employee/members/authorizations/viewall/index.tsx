import ViewAuthorizations from "~components/Layout/ViewAuthorizations";
import requiresStaffCredentials from "~containers/App/requiresStaffCredentials";

export default requiresStaffCredentials(ViewAuthorizations);
