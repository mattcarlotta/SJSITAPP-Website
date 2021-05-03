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

context("Staff View Member Page", () => {
  before(() => {
    cy.exec("npm run seed:stage");
  });

  beforeEach(() => {
    cy.staffLogin();
    cy.visit("/employee/members/viewall?page=1");
  });

  after(() => {
    cy.exec("npm run drop:stage");
  });

  it("intially displays the profile tab", () => {
    cy.findByTestId("table-actions").should("exist").eq(4).click();
    cy.findByTestId("view-record").click();

    cy.url().should("contain", "/employee/members/view");

    cy.findByTestId("member-settings-page").should("exist");

    cy.findByTestId("member-profile").should("exist");
  });

  it("displays a member's details", () => {
    cy.findByTestId("table-actions").should("exist").eq(4).click();
    cy.findByTestId("view-record").click();

    cy.url().should("contain", "/employee/members/view");

    cy.findByTestId("member-settings-page").should("exist");

    cy.findByTestId("member-profile").should("exist");

    cy.findByTestId("member-status").contains("active");
    cy.findByTestId("formatted-date").contains(today);
    cy.findByTestId("role-selected-value").contains("member");
    cy.findElementByNameAttribute("input", "emailReminders").should(
      "be.checked"
    );
    cy.findByTestId("email").should("have.value", "scheduledmember@test.com");
    cy.findByTestId("firstName").should("have.value", "Scheduled");
    cy.findByTestId("lastName").should("have.value", "Member");
  });

  it("updates and removes the selected user's avatar", () => {
    cy.findByTestId("table-actions").should("exist").eq(4).click();
    cy.findByTestId("view-record").click();

    cy.url().should("contain", "/employee/members/view");

    cy.findByTestId("member-settings-page").should("exist");

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

  it("suspends and activates a member", () => {
    cy.findByTestId("table-actions").should("exist").eq(6).click();
    cy.findByTestId("view-record").click();

    cy.url().should("contain", "/employee/members/view");

    cy.findByTestId("member-settings-page").should("exist");

    cy.findByTestId("update-user-status").click();

    cy.alertExistsWith("Member has been suspended.");

    cy.findByTestId("member-status").contains("suspended");

    cy.wait(2000);

    cy.findByTestId("update-user-status").click();

    cy.findByTestId("member-status").contains("active");

    cy.alertExistsWith("Member has been reactivated.");
  });

  it("doesn't allow the member to update their email to an account that already exists", () => {
    cy.findByTestId("table-actions").should("exist").eq(6).click();
    cy.findByTestId("view-record").click();

    cy.url().should("contain", "/employee/members/view");

    cy.findByTestId("member-settings-page").should("exist");

    cy.findByTestId("email").clear().type("scheduledmember@test.com");

    cy.submitForm();

    cy.alertExistsWith(
      "That email is already in use and is associated with an active account."
    );
  });

  it("doesn't allow the member to update their first and last name to an account that already exists", () => {
    cy.findByTestId("table-actions").should("exist").eq(6).click();
    cy.findByTestId("view-record").click();

    cy.url().should("contain", "/employee/members/view");

    cy.findByTestId("member-settings-page").should("exist");

    cy.findByTestId("firstName").clear().type("Scheduled");
    cy.findByTestId("lastName").clear().type("Member");

    cy.submitForm();

    cy.alertExistsWith(
      "The first and last name provided is already in use and is associated with an active account. In order to continue, please use a uniquely identifable name such as a middle name initial or a nickname."
    );
  });

  it("updates the member's details", () => {
    cy.findByTestId("table-actions").should("exist").eq(6).click();
    cy.findByTestId("view-record").click();

    cy.url().should("contain", "/employee/members/view");

    cy.findByTestId("member-settings-page").should("exist");

    cy.findByTestId("role-selected-value").click();

    cy.findByTestId("staff").should("exist").click();

    cy.findElementByNameAttribute("input", "emailReminders").click();

    cy.findByTestId("email").clear().type("janeturkdoe2@example.com");

    cy.findByTestId("firstName").clear().type("Jane");
    cy.findByTestId("lastName").clear().type("Turk-Doe");

    cy.submitForm();

    cy.alertExistsWith("Successfully updated the member profile.");

    cy.findElementByNameAttribute("input", "emailReminders").should(
      "not.be.checked"
    );
    cy.findByTestId("email").should("have.value", "janeturkdoe2@example.com");
    cy.findByTestId("firstName").should("have.value", "Jane");
    cy.findByTestId("lastName").should("have.value", "Turk-Doe");
  });

  it("displays the availability tab and updates availability", () => {
    cy.findByTestId("table-actions").should("exist").eq(4).click();
    cy.findByTestId("view-record").click();

    cy.url().should("contain", "/employee/members/view");

    cy.findByTestId("member-settings-page").should("exist");

    cy.findByTestId("tab-availability").should("exist").click();

    cy.findByTestId("my-availability").should("exist");

    cy.findByTestId("selectedMonth-selected-value").click();

    cy.findByTestId(lastMonth).click();

    cy.findByTestId("no-availability").should("exist");
  });

  it("displays the responses tab and updates calendar", () => {
    cy.findByTestId("table-actions").should("exist").eq(4).click();
    cy.findByTestId("view-record").click();

    cy.url().should("contain", "/employee/members/view");

    cy.findByTestId("member-settings-page").should("exist");

    cy.findByTestId("tab-responses").should("exist").click();

    cy.findByTestId("upcoming-event").should("exist");

    cy.findByTestId("previous-month-button").click();

    cy.findByTestId("upcoming-event").should("not.exist");
  });
});
