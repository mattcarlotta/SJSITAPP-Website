import moment from "../../../src/utils/momentWithTimezone";
import {
  daySuffix,
  fullyearFormat,
  monthnameFormat
} from "../../../src/utils/dateFormats";

const lastMonth = moment().subtract(1, "month").format(monthnameFormat);
const today = moment().format(
  `${monthnameFormat} ${daySuffix}, ${fullyearFormat}`
);

context("Member Settings Page", () => {
  before(() => {
    cy.exec("npm run seed:stage");
  });

  beforeEach(() => {
    cy.memberLogin();
    cy.visit("/employee/settings");
  });

  after(() => {
    cy.exec("npm run drop:stage");
  });

  it("intially displays the profile tab", () => {
    cy.findByTestId("settings-page").should("exist");

    cy.findByTestId("member-profile").should("exist");
  });

  it("displays the availability tab and updates availability", () => {
    cy.findByTestId("member-profile").should("exist");

    cy.findByTestId("tab-availability").should("exist").click();

    cy.findByTestId("my-availability").should("exist");

    cy.findByTestId("selectedMonth-selected-value").click();

    cy.findByTestId(lastMonth).click();

    cy.findByTestId("no-availability").should("exist");
  });

  it("displays the responses tab and updates calendar", () => {
    cy.findByTestId("member-profile").should("exist");

    cy.findByTestId("tab-responses").should("exist").click();

    cy.findByTestId("upcoming-event").should("exist");

    cy.findByTestId("previous-month-button").click();

    cy.findByTestId("upcoming-event").should("not.exist");
  });

  it("displays the logged in member details", () => {
    cy.findByTestId("member-profile").should("exist");

    cy.findByTestId("member-status").contains("active");
    cy.findByTestId("formatted-date").contains(today);
    cy.findByTestId("member-role").contains("member");
    cy.findElementByNameAttribute("input", "emailReminders").should(
      "be.checked"
    );
    cy.findByTestId("email").should("have.value", "scheduledmember@test.com");
    cy.findByTestId("firstName").should("have.value", "Scheduled");
    cy.findByTestId("lastName").should("have.value", "Member");
  });

  it("updates and removes the logged in member's avatar", () => {
    cy.findByTestId("member-profile").should("exist");

    cy.findByTestId("toggle-upload-form-button").click();

    cy.findByTestId("upload-avatar-input")
      .attachFile("files/example.png", "image/png")
      .trigger("change", { force: true });

    cy.alertExistsWith("Successfully updated your current avatar.");

    cy.wait(1000);

    cy.findByTestId("remove-avatar-button").click();

    cy.alertExistsWith("Successfully removed your current avatar.");
  });

  it("doesn't allow the member to update their email to an account that already exists", () => {
    cy.findByTestId("member-profile").should("exist");

    cy.findByTestId("email").clear().type("staffmember@example.com");

    cy.submitForm();

    cy.alertExistsWith(
      "That email is already in use and is associated with an active account."
    );
  });

  it("doesn't allow the member to update their first and last name to an account that already exists", () => {
    cy.findByTestId("member-profile").should("exist");

    cy.findByTestId("firstName").clear().type("Staff");
    cy.findByTestId("lastName").clear().type("Member");

    cy.submitForm();

    cy.alertExistsWith(
      "The first and last name provided is already in use and is associated with an active account. In order to continue, please use a uniquely identifable name such as a middle name initial or a nickname."
    );
  });

  it("updates the member's name and email preferences", () => {
    cy.findByTestId("member-profile").should("exist");

    cy.findElementByNameAttribute("input", "emailReminders").click();

    cy.findByTestId("firstName").clear().type("Jane");
    cy.findByTestId("lastName").clear().type("Turk-Doe");

    cy.submitForm();

    cy.alertExistsWith("Successfully updated your settings.");

    cy.findElementByNameAttribute("input", "emailReminders").should(
      "not.be.checked"
    );
    cy.findByTestId("firstName").should("have.value", "Jane");
    cy.findByTestId("lastName").should("have.value", "Turk-Doe");
  });

  it("updates the member's email and logs them out", () => {
    cy.findByTestId("member-profile").should("exist");

    cy.findByTestId("email").clear().type("janeturkdoe2@example.com");

    cy.submitForm();

    cy.alertExistsWith(
      "Your profile has been updated. Please re-log into your account with your new email address."
    );

    cy.url().should("contain", "/employee/login");

    cy.findByTestId("login-form").should("exist");

    cy.findByTestId("email").type("janeturkdoe2@example.com");

    cy.findByTestId("password").type("password");

    cy.submitForm();

    cy.url().should("contain", "/employee/dashboard");
  });
});
