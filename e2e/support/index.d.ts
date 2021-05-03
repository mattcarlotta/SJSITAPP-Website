/// <reference types="cypress" />

declare namespace Cypress {
  export interface Chainable {
    /**
     * Custom command to check if a toast alert exists and contains text.
     * @example cy.alert("message")
     */
    alertExistsWith(message: string): void;

    /**
     * Custom to attach a file to a request by file location and file type.
     * @example cy.attach_file("files/example.png", "image/png")
     */
    attachFile(file: string, type: string): Chainable<Element>;

    /**
     * Custom command to click the next month button of a Material UI Dialog.
     * @example cy.clickNextMonth()
     */
    clickNextMonth(): void;

    /**
     * Custom command to click an "OK" button within a Material UI Dialog.
     * @example cy.clickOK()
     */
    clickOK(): void;

    /**
     * Custom command to click the previous month button of a Material Dialog.
     * @example cy.clickPreviousMonth()
     */
    clickPreviousMonth(): void;

    /**
     * Custom command to click the year button a Material Dialog.
     * @example cy.clickYear()
     */
    clickYear(): void;

    /**
     * Custom command to select a DOM element by data-field attribute.
     * @example cy.findByDataField("example")
     */
    findByDataField(field: string): Chainable<JQuery<HTMLElement>>;

    /**
     * Custom command to select a DOM element by name attribute.
     * @example cy.findByTestId("input","example")
     */
    findElementByNameAttribute(
      element: string,
      name: string
    ): Chainable<JQuery<HTMLElement>>;

    /**
     * Custom command to select a DOM element by data-testid attribute.
     * @example cy.findByTestId("greeting")
     */
    findByTestId(value: string): Chainable<JQuery<HTMLElement>>;

    /**
     * Custom command to assert that a form has errors.
     * @example cy.formHasErrors(1)
     */
    formHasErrors(errors: number): void;

    /**
     * Custom command to log a regular member into the application.
     * @example cy.memberLogin()
     */
    memberLogin(): Chainable<Cypress.Response>;

    /**
     * Custom command to open and quickly set a Material UI date/time field by clicking a Material Dialog "OK" button.
     * @example cy.setMUIField("field")
     */
    setMUIField(field: string): void;

    /**
     * Custom command to select a Material UI date within a Material Dialog.
     * @example cy.selectDate(1)
     */
    selectDate(date: number): void;

    /**
     * Custom command to select the last Material UI date within a Material Dialog.
     * @example cy.selectLastDate()
     */
    selectLastDate(): void;

    /**
     * Custom command to select a Material UI year within a Material Dialog.
     * @example cy.selectYear("2000")
     */
    selectYear(year: string): void;

    /**
     * Custom command to log a staff member into the application.
     * @example cy.staffLogin()
     */
    staffLogin(): Chainable<Cypress.Response>;

    /**
     * Custom command to click a submit button within a form.
     * @example cy.submitForm()
     */
    submitForm(): void;
  }
}
