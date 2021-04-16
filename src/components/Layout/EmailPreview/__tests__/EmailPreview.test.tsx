import { mount, ReactWrapper } from "enzyme";
import moment from "~utils/momentWithTimezone";
import { dateTimeFormat } from "~utils/dateFormats";
import EmailPreview from "../index";

const initProps = {
  message: "",
  sendDate: "",
  sendFrom: "",
  subject: "",
  sendTo: [],
  status: ""
};

const currentDay = moment();

describe("Email Preview", () => {
  let wrapper: ReactWrapper;
  let findById: (id: string) => ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<EmailPreview {...initProps} />);
    findById = id => wrapper.find(`[data-testid='${id}']`);
  });

  it("displays an email with errors", async () => {
    expect(findById("email-preview")).toExist();
    expect(findById("email-subject").text()).toEqual("Invalid Email Subject");
    expect(findById("send-from-address").first().text()).toEqual(
      "Your Email Address"
    );
    expect(findById("send-to-address").first().text()).toEqual(
      "Invalid Recipient Address."
    );
    expect(findById("email-message").text()).toEqual("Invalid Email Body");
  });

  it("renders an email subject", async () => {
    wrapper.setProps({ subject: "Test" });
    expect(findById("email-subject").text()).toEqual("Test");
  });

  it("renders an email status", async () => {
    wrapper.setProps({ status: "unsent" });
    expect(wrapper.find("FaStopwatch")).toExist();
  });

  it("renders an email send date", async () => {
    wrapper.setProps({ sendDate: currentDay.format() });
    expect(findById("email-send-date").first().text()).toEqual(
      currentDay.format(dateTimeFormat)
    );
  });

  it("renders a single email send to address", async () => {
    wrapper.setProps({ sendTo: ["Bob Dole<bobdole@example.com>"] });
    expect(findById("send-to-address").first().text()).toEqual("Bob Dole");
  });

  it("renders multiple email send to addresses", async () => {
    wrapper.setProps({
      sendTo: ["Bob Dole<bobdole@example.com>", "Jane Doe<janedoe@example.com"]
    });
    expect(findById("send-to-address").first().text()).toEqual(
      "multiple email addresses"
    );
  });

  it("renders an email message", async () => {
    wrapper.setProps({
      message: "<span>Hello</span>"
    });
    expect(findById("email-message").first().text()).toEqual("Hello");
  });
});
