import requiresStaffCredentials from "~containers/App/requiresStaffCredentials";

const CreateEvent = () => <div>Create Event</div>;

export default requiresStaffCredentials(CreateEvent);
