import Form from "../../models/form";
import { moment } from "../../helpers";

/**
 * Function to seed the testing Mongo database with forms.
 *
 * @function
 * @returns
 */
export const seedForms = async (currentSeason: string): Promise<void> => {
  const form1 = {
    expirationDate: new Date("2000-08-10T07:00:00.000Z"),
    startMonth: new Date("2000-08-01T07:00:00.000Z"),
    endMonth: new Date("2000-08-31T07:00:00.000Z"),
    notes: "Form 1",
    seasonId: "20002001",
    sendEmailNotificationsDate: new Date("2000-08-31T07:00:00.000Z"),
    sentEmails: false
  };

  const form2 = {
    expirationDate: new Date("2005-08-10T07:00:00.000Z"),
    startMonth: new Date("2005-08-01T07:00:00.000Z"),
    endMonth: new Date("2005-08-31T07:00:00.000Z"),
    notes: "Form 2",
    seasonId: "20052006",
    sendEmailNotificationsDate: new Date("2005-08-31T07:00:00.000Z"),
    sentEmails: false
  };

  const form3 = {
    expirationDate: new Date("2011-08-10T07:00:00.000Z"),
    startMonth: new Date("2011-08-01T07:00:00.000Z"),
    endMonth: new Date("2011-08-31T07:00:00.000Z"),
    notes: "Form 3",
    seasonId: "20112012",
    sendEmailNotificationsDate: new Date("2011-08-31T07:00:00.000Z"),
    sentEmails: false
  };

  const form4 = {
    expirationDate: new Date("2099-08-10T07:00:00.000Z"),
    startMonth: new Date("2019-08-01T07:00:00.000Z"),
    endMonth: new Date("2019-08-31T07:00:00.000Z"),
    notes: "Form 4",
    seasonId: currentSeason,
    sendEmailNotificationsDate: new Date("2019-08-31T07:00:00.000Z"),
    sentEmails: false
  };

  const form5 = {
    expirationDate: new Date("2099-08-10T07:00:00.000Z"),
    startMonth: new Date("2019-09-01T07:00:00.000Z"),
    endMonth: new Date("2019-09-30T07:00:00.000Z"),
    notes: "Form 5",
    seasonId: currentSeason,
    sendEmailNotificationsDate: new Date("2019-09-31T07:00:00.000Z"),
    sentEmails: false
  };

  const form6 = {
    expirationDate: new Date("2099-08-10T07:00:00.000Z"),
    startMonth: new Date("2019-10-01T07:00:00.000Z"),
    endMonth: new Date("2019-10-31T07:00:00.000Z"),
    notes: "Form 6",
    seasonId: currentSeason,
    sendEmailNotificationsDate: new Date("2019-10-31T07:00:00.000Z"),
    sentEmails: false
  };

  const form7 = {
    expirationDate: new Date("2099-08-10T07:00:00.000Z"),
    startMonth: new Date("2019-11-01T07:00:00.000Z"),
    endMonth: new Date("2019-11-31T07:00:00.000Z"),
    notes: "Form 7",
    seasonId: currentSeason,
    sendEmailNotificationsDate: new Date("2019-11-31T07:00:00.000Z"),
    sentEmails: true
  };

  const form8 = {
    expirationDate: new Date("2099-08-10T07:00:00.000Z"),
    startMonth: moment().startOf("month").toDate(),
    endMonth: moment().endOf("month").toDate(),
    notes: "Todays Form",
    seasonId: currentSeason,
    sendEmailNotificationsDate: new Date("2099-11-31T07:00:00.000Z"),
    sentEmails: true
  };

  const form9 = {
    expirationDate: new Date("2099-08-10T07:00:00.000Z"),
    startMonth: moment().add(1, "months").startOf("month").toDate(),
    endMonth: moment().add(1, "months").endOf("month").toDate(),
    notes: "Next Months Form",
    seasonId: currentSeason,
    sendEmailNotificationsDate: new Date("2099-11-31T07:00:00.000Z"),
    sentEmails: true
  };

  const form10 = {
    expirationDate: new Date("2099-08-10T07:00:00.000Z"),
    startMonth: new Date("2019-11-01T07:00:00.000Z"),
    endMonth: new Date("2019-11-31T07:00:00.000Z"),
    notes: "Delete this form.",
    seasonId: currentSeason,
    sendEmailNotificationsDate: new Date("2019-11-31T07:00:00.000Z"),
    sentEmails: true
  };

  const autoDeletedForm = {
    expirationDate: new Date("2099-08-10T07:00:00.000Z"),
    startMonth: new Date("2019-11-01T07:00:00.000Z"),
    endMonth: new Date("2019-11-31T07:00:00.000Z"),
    notes: "Auto deleted form.",
    seasonId: "19801981",
    sendEmailNotificationsDate: new Date("2019-11-31T07:00:00.000Z"),
    sentEmails: true
  };

  await Form.insertMany([
    form1,
    form2,
    form3,
    form4,
    form5,
    form6,
    form7,
    form8,
    form9,
    form10,
    autoDeletedForm
  ]);
};

export default seedForms;
