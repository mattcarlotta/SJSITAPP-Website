context("Staff View Mail Page", () => {
  before(() => {
    cy.exec("npm run seed:stage");
  });

  beforeEach(() => {
    cy.staffLogin();
    cy.reload();
    cy.visit("/employee/mail/viewall?page=1");
  });

  after(() => {
    cy.exec("npm run drop:stage");
  });

  it("displays the View Mail page", () => {
    cy.findByTestId("view-mail-page").should("exist");
    cy.findByTestId("data-table").should("exist");

    cy.findByTestId("table-actions").first().click();
    cy.findByTestId("view-record").click();

    cy.url().should("contain", "/employee/mail/view");

    cy.findByTestId("view-email-page").should("exist");
  });

  it("previews the email", () => {
    cy.findByTestId("data-table").should("exist");
    cy.findByTestId("table-actions").first().click();
    cy.findByTestId("view-record").click();

    cy.findByTestId("email-subject").should("have.text", "Test 88");

    cy.findByTestId("send-from-address").contains("test@test.com");

    cy.findByTestId("send-to-address").contains("test@test.com");

    cy.findByTestId("email-message").should("have.text", "Test 88");

    cy.findByTestId("view-mail-link").click();

    cy.url().should("contain", "/employee/mail/viewall?page=1");
  });
});
