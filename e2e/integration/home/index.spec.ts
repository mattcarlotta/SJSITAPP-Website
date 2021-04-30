context("Home Page", () => {
  before(() => {
    cy.exec("npm run seed:stage");
  });

  beforeEach(() => {
    cy.visit("/");
  });

  after(() => {
    cy.exec("npm run drop:stage");
  });

  it("initially displays a logo and an 'Employee Login' button", () => {
    cy.findByTestId("spinner").should("exist");

    cy.findByTestId("home-link")
      .should("exist")
      .should("have.text", "Employee Login");
  });

  it("redirects unauthenticated users to the login page", () => {
    cy.visit("/employee/dashboard");

    cy.url().should("contain", "/employee/login");
  });

  it("changes the home page to have a 'Go To Dashboard' button when logged in", () => {
    cy.staffLogin();

    cy.reload();

    cy.findByTestId("home-link").should("have.text", "View Dashboard");

    cy.findByTestId("home-link").click();

    cy.url().should("contain", "/employee/dashboard");
  });
});
