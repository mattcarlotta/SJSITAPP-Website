/// <reference types="cypress" />

declare namespace Cypress {
  export interface Chainable {
    /**
     * Custom command to select DOM element by data-tesit attribute.
     * @example cy.findByTestId('greeting')
     */
    findByTestId(value: string): Chainable<JQuery<HTMLElement>>;

    /**
     * Custom command to log a regular member into the application.
     * @example cy.memberLogin()
     */
    memberLogin(): Chainable<Cypress.Response>;

    /**
     * Custom command to log a staff member into the application.
     * @example cy.staffLogin()
     */
    staffLogin(): Chainable<Cypress.Response>;

    /**
     * Custom command to set a material UI field.
     * @example cy.setMUIField("field")
     */
    setMUIField(field: string): void;

    /**
     * Custom to attach a file to a request by file location and file type.
     * @example cy.attach_file("files/example.png", "image/png")
     */
    attach_file(file: string, type: string): Chainable<Element>;
  }
}
