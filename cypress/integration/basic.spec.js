/// <reference types="cypress" />

describe('Cypress Basics', () => {
  it('visit', () => {
    cy.visitServer()

    cy.title().should('be.equal', 'Cy Playground')
    cy.title().should('contain', 'Cy').debug()

    cy.title()
      .should('be.equal', 'Cy Playground')
      .and('contain', 'Cy')

    cy.title().then(title => {
      console.log(title)
      cy.get('#formDescription').type(title).should('have.value', title)
    })
  })
})

describe('Interact with elements', () => {
  it('click', () => {
    cy.visitServer()

    cy.get('#buttonBasic')
      .should('have.text', 'CLICK ME !')
    cy.get('#buttonBasic').click()
    cy.get('#buttonBasic').should('have.text', 'THANKS !')
  })

})