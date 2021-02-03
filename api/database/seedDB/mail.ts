import Mail from "../../models/mail";

/**
 * Function to seed the testing Mongo database with mail.
 *
 * @function
 * @returns
 */
export const seedMail = async (): Promise<void> => {
  const newMail = {
    sendTo: ["test@test.com"],
    sendFrom: "test@test.com",
    sendDate: "2000-10-06T07:00:00.000+00:00",
    message: "<span>Test</span>",
    status: "unsent",
    subject: "Test"
  };

  const newMail2 = {
    sendTo: ["test@test.com"],
    sendFrom: "test@test.com",
    sendDate: "2000-10-06T07:00:00.000+00:00",
    message: "<span>Test 2</span>",
    status: "sent",
    subject: "Test 2"
  };

  const newMail3 = {
    sendTo: ["test@test.com"],
    sendFrom: "test@test.com",
    sendDate: "2000-10-06T07:00:00.000+00:00",
    message: "<span>Test 3</span>",
    status: "unsent",
    subject: "Test 3"
  };

  const newMail4 = {
    sendTo: ["test@test.com"],
    sendFrom: "test@test.com",
    sendDate: "2099-10-06T07:00:00.000+00:00",
    message: "<span>Test 88</span>",
    status: "unsent",
    subject: "Test 88"
  };

  const newMail5 = {
    sendTo: ["test@test.com"],
    sendFrom: "test@test.com",
    sendDate: "2011-10-06T07:00:00.000+00:00",
    message: "<span>Test 1199</span>",
    status: "sent",
    subject: "Test 1199"
  };

  const newMail6 = {
    sendTo: ["test@test.com"],
    sendFrom: "test@test.com",
    sendDate: "2011-10-06T07:00:00.000+00:00",
    message: "<span>Delete this mail.</span>",
    status: "sent",
    subject: "Test 1199"
  };

  await Mail.insertMany([
    newMail,
    newMail2,
    newMail3,
    newMail4,
    newMail5,
    newMail6
  ]);
};

export default seedMail;
