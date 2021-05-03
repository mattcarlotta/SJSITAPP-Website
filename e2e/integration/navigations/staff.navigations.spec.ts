context("Staff Site Navigations", () => {
  before(() => {
    cy.exec("npm run seed:stage");
  });

  beforeEach(() => {
    cy.staffLogin();
    cy.visit("/employee/dashboard");
  });

  after(() => {
    cy.exec("npm run drop:stage");
  });

  it("top-right avatar displays the current logged in member's first and last name", () => {
    cy.findByTestId("account-dropdown").should("exist").click();

    cy.findByTestId("user-menu").should("exist");

    cy.findByTestId("users-name").contains("Staff Member");
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
      { title: "Services", link: "/employee/services", id: "services-link" },
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

    [
      {
        menu: "Events",
        title: "Create Event",
        link: "/employee/events/create",
        id: "create-event-link"
      },
      {
        menu: "Events",
        title: "View Events",
        link: "/employee/events/viewall?page=1",
        id: "events-viewall-link"
      },
      {
        menu: "Forms",
        title: "Create Form",
        link: "/employee/forms/create",
        id: "create-form-link"
      },
      {
        menu: "Forms",
        title: "View Forms",
        link: "/employee/forms/viewall?page=1",
        id: "forms-viewall-link"
      },
      {
        menu: "Mail",
        title: "Create Mail",
        link: "/employee/mail/create",
        id: "create-mail-link"
      },
      {
        menu: "Mail",
        title: "View Mail",
        link: "/employee/mail/viewall?page=1",
        id: "mail-viewall-link"
      },
      {
        menu: "Members",
        title: "Create Member",
        link: "/employee/members/create",
        id: "create-member-link"
      },
      {
        menu: "Members",
        title: "View Authorizations",
        link: "/employee/members/authorizations/viewall?page=1",
        id: "authorizations-viewall-link"
      },
      {
        menu: "Members",
        title: "View Members",
        link: "/employee/members/viewall?page=1",
        id: "members-viewall-link"
      },
      {
        menu: "Seasons",
        title: "Create Season",
        link: "/employee/seasons/create",
        id: "create-season-link"
      },
      {
        menu: "Seasons",
        title: "View Season",
        link: "/employee/seasons/viewall?page=1",
        id: "seasons-viewall-link"
      }
    ].forEach(({ menu, title, link, id }) => {
      cy.visit("/employee/404");

      cy.findByTestId("sidemenu-tree")
        .find(`[data-testid='${menu}']`)
        .contains(menu)
        .click();

      cy.findByTestId("sidemenu-tree")
        .find(`[data-testid='${id}']`)
        .contains(title)
        .click();

      cy.url().should("contain", link);
    });
  });
});
