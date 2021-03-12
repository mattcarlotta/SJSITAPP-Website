import ContactForm from "~components/Layout/ContactUsForm";
import requiresBasicCredentials from "~containers/App/requiresBasicCredentials";

export default requiresBasicCredentials(ContactForm);
