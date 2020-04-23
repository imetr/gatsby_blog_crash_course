/// <reference types="Cypress" />

describe("Accessibility checks", () => {
    beforeEach(() => {
      cy.visit("/")
      cy.injectAxe()
      cy.wait(500)
    })
    // it("Has no detectable a11y violations on load", () => {
    //   cy.checkA11y()
    // })
    it("Checks if footer link is focusable and has the correct attributes", () => {
        cy.queryByText("Gatsby").focus()
        cy.focused()
          .should("have.text", "Gatsby")
          .should("have.attr", "href", "https://www.gatsbyjs.org")
          .should("not.have.css", "background-color", "red")
      })
    it("TEST NAV MENU LIST", () => {
        cy.get('ul.menuList').children().eq(1).click()
        cy.url().should('include','/about')
        cy.get('ul.menuList').children().eq(2).click()
        cy.url().should('include','/services')
    })
  })