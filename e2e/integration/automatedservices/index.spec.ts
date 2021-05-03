context("Staff Automated Services Page", () => {
  before(() => {
    cy.exec("npm run seed:stage");
  });

  beforeEach(() => {
    cy.staffLogin();
    cy.visit("/employee/services");
  });

  after(() => {
    cy.exec("npm run drop:stage");
  });

  it("displays the automated services page", () => {
    cy.findByTestId("automated-services-page").should("exist");
  });

  it("initially displays an about services not being created", () => {
    cy.findByTestId("automated-services-page").should("exist");
    cy.findByTestId("no-services-message").should("exist");
  });

  it("displays a form to create services", () => {
    cy.findByTestId("automated-services-page").should("exist");

    cy.findByTestId("edit-settings-button").click();

    cy.findByTestId("services-settings-form").should("exist");
  });

  it("displays errors if empty fields are submitted", () => {
    cy.findByTestId("automated-services-page").should("exist");

    cy.findByTestId("edit-settings-button").click();

    cy.findByTestId("services-settings-form").should("exist");

    cy.submitForm();

    cy.formHasErrors(3);
  });

  it("creates automated services", () => {
    cy.findByTestId("automated-services-page").should("exist");

    cy.findByTestId("edit-settings-button").click();

    cy.findByTestId("services-settings-form").should("exist");

    ["formReminderTime", "eventTime", "scheduleTime"].forEach(field => {
      cy.findElementByNameAttribute("input", field).click();

      cy.get(".MuiPickersToolbarButton-toolbarBtn")
        .first()
        .should("exist")
        .click();

      cy.get(".MuiPickersClock-squareMask").click(250, 120); // set to 3 hours
      cy.get(".MuiPickersClock-squareMask").click(250, 125); // set to 15 minutes

      cy.clickOK();
    });

    cy.submitForm();

    cy.alertExistsWith("Successfully created the services!");

    cy.findByTestId("no-services-message").should("not.exist");
  });
});
