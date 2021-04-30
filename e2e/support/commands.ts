// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
/// <reference types="cypress" />

Cypress.Commands.add(
  "attach_file",
  {
    prevSubject: "element"
  },
  (input, fileName, fileType) => {
    cy.fixture(fileName)
      .then(content => Cypress.Blob.base64StringToBlob(content, fileType))
      .then(blob => {
        const testFile = new File([blob], fileName, { type: fileType });
        const dataTransfer = new DataTransfer();

        dataTransfer.items.add(testFile);

        console.log("dataTransfer", dataTransfer);
        input[0].files = dataTransfer.files;
        return input;
      });
  }
);

Cypress.Commands.add("alertExistsWith", message => {
  cy.get("[data-testid='alert-message']").should("exist").contains(message);

  cy.get("[data-testid='alert-message']").click();
});

Cypress.Commands.add("clickOK", () => {
  cy.get(".MuiDialogActions-spacing")
    .find("button")
    .eq(1)
    .should("exist")
    .click();
});

Cypress.Commands.add("clickNextMonth", () => {
  cy.get(".MuiPickersCalendarHeader-switchHeader").find("button").eq(1).click();
});

Cypress.Commands.add("clickPreviousMonth", () => {
  cy.get(".MuiPickersCalendarHeader-switchHeader")
    .find("button")
    .first()
    .click();
});

Cypress.Commands.add("findByDataField", value =>
  cy.get(`[data-field='${value}']`)
);

Cypress.Commands.add("findElementByNameAttribute", (element, name) =>
  cy.get(`${element}[name='${name}']`)
);

Cypress.Commands.add("findByTestId", value =>
  cy.get(`[data-testid='${value}']`)
);

Cypress.Commands.add("formHasErrors", errors => {
  cy.get("[data-testid='errors']").should("have.length", errors);
});

Cypress.Commands.add("memberLogin", () =>
  cy.request("POST", "http://localhost:5000/api/signin", {
    email: "scheduledmember@test.com",
    password: "password"
  })
);

Cypress.Commands.add("selectDate", date => {
  cy.get(".MuiPickersCalendar-week")
    .should("exist")
    .find("button[tabIndex='0']")
    .eq(date - 1)
    .should("exist")
    .click();
});

Cypress.Commands.add("selectLastDate", date => {
  cy.get(".MuiPickersCalendar-week")
    .should("exist")
    .find("button[tabIndex='0']")
    .last()
    .should("exist")
    .click();
});

Cypress.Commands.add("staffLogin", () =>
  cy.request("POST", "http://localhost:5000/api/signin", {
    email: "staffmember@example.com",
    password: "password"
  })
);

Cypress.Commands.add("submitForm", () => {
  cy.get("[data-testid='submit-button']").should("exist").click();
});

Cypress.Commands.add("setMUIField", id => {
  cy.get(`input[name='${id}']`).click();

  cy.get(".MuiDialogActions-spacing")
    .find("button")
    .eq(1)
    .should("exist")
    .click();
});
