import CreateAPForm from "~components/Layout/CreateAPForm";
import requiresBasicCredentials from "~containers/App/requiresBasicCredentials";

export default requiresBasicCredentials(CreateAPForm);
