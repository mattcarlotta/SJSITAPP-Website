// import ComposeMailForm from "~components/Layout/ComposeMailForm";
import requiresStaffCredentials from "~containers/App/requiresStaffCredentials";

const Services = () => <div>Services</div>;

export default requiresStaffCredentials(Services);
