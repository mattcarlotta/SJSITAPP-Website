import requiresBasicCredentials from "~containers/App/requiresBasicCredentials";

const Help = () => <div>Help</div>;

export default requiresBasicCredentials(Help);
