context("Member Site Navigations", () => {
  before(() => {
    cy.exec("npm run seed:stage");
  });

  beforeEach(() => {
    cy.memberLogin();
    cy.visit("/employee/dashboard");
  });

  after(() => {
    cy.exec("npm run drop:stage");
  });

  it("opens and closes the side menu", () => {
    cy.findByTestId("fixed-sidemenu-open").should("exist");

    cy.findByTestId("hamburger-menu").click();

    cy.findByTestId("fixed-sidemenu-closed").should("exist");

    cy.findByTestId("hamburger-menu").click();

    cy.findByTestId("fixed-sidemenu-open").should("exist");
  });

  it("persists closed side menu across page navigations", () => {
    cy.findByTestId("hamburger-menu").click();

    cy.findByTestId("fixed-sidemenu-closed").should("exist");

    cy.findByTestId("account-dropdown").should("exist").click();

    cy.get("#user-settings")
      .find("[data-testid='contact-us-link']")
      .first()
      .click();

    cy.url().should("contain", "/employee/contact-us");

    cy.findByTestId("fixed-sidemenu-closed").should("exist");
  });

  it("top-left logo redirects to dashboard", () => {
    cy.findByTestId("logo-dashboard-link").should("exist").click();

    cy.url().should("contain", "/");
  });

  it("top-right avatar displays the current logged in member's first and last name", () => {
    cy.findByTestId("account-dropdown").should("exist").click();

    cy.findByTestId("user-menu").should("exist");

    cy.findByTestId("users-name").contains("Scheduled Member");
  });

  it("navigates to the help page when the search bar is used", () => {
    cy.get("input").first().should("exist").type("How do I change my email?");

    cy.findByTestId("How do I change my email?").click();

    cy.url().should("contain", "/employee/help#how-do-i-change-my-email");
  });

  it("logs the user out when the top-right avatar menu 'Signout' button is clicked", () => {
    cy.findByTestId("account-dropdown").should("exist").click();
    cy.get("#user-settings").should("exist");

    cy.findByTestId("signout-user").click();

    cy.url().should("contain", "/employee/login");
  });

  it("navigates to links using the top-right avatar menu ", () => {
    [
      {
        title: "Contact Us",
        link: "/employee/contact-us",
        id: "contact-us-link"
      },
      { title: "Help", link: "/employee/help", id: "help-link" },
      {
        title: "My Availability",
        link: "/employee/settings?tab=availability",
        id: "settings-availability-link"
      },
      {
        title: "My Responses",
        link: "/employee/settings?tab=responses",
        id: "settings-responses-link"
      },
      {
        title: "Settings",
        link: "/employee/settings?tab=profile",
        id: "settings-profile-link"
      }
    ].forEach(({ id, link, title }) => {
      cy.visit("/employee/dashboard");

      cy.findByTestId("account-dropdown").should("exist").click();
      cy.get("#user-settings").should("exist");

      cy.get("#user-settings")
        .find(`[data-testid='${id}']`)
        .first()
        .contains(title)
        .click();

      cy.url().should("contain", link);
    });
  });

  it("navigates to links using the side menu", () => {
    [
      {
        title: "Dashboard",
        link: "/employee/dashboard",
        id: "dashboard-link"
      },
      { title: "Schedule", link: "/employee/schedule", id: "schedule-link" },
      {
        title: "Settings",
        link: "/employee/settings",
        id: "settings-link"
      },
      {
        title: "Help",
        link: "/employee/help",
        id: "help-link"
      },
      {
        title: "Contact Us",
        link: "/employee/contact-us",
        id: "contact-us-link"
      },
      {
        title: "Privacy",
        link: "/employee/privacy",
        id: "privacy-link"
      },
      {
        title: "Licensing",
        link: "/employee/licensing",
        id: "licensing-link"
      }
    ].forEach(({ id, link, title }) => {
      cy.visit("/employee/404");

      cy.findByTestId("sidemenu-tree")
        .find(`[data-testid='${id}']`)
        .first()
        .contains(title)
        .click();

      cy.url().should("contain", link);
    });
  });
});
