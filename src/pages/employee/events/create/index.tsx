import requiresBasicCredentials from "~containers/App/requiresBasicCredentials";

const CreateEvent = () => <div>Create Event</div>;

export default requiresBasicCredentials(CreateEvent);
