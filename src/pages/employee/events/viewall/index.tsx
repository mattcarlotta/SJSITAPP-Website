import requiresBasicCredentials from "~containers/App/requiresBasicCredentials";

const ViewEvents = () => <div>View Events</div>;

export default requiresBasicCredentials(ViewEvents);
