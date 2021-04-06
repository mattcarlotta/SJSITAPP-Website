import requiresStaffCredentials from "~containers/App/requiresStaffCredentials";

const ViewEvents = () => <div>View Events</div>;

export default requiresStaffCredentials(ViewEvents);
