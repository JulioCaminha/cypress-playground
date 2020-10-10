/// <reference types="cypress" />

const delay = { delay: 100 }

describe('Delays...', () => {

  before(() => {
    cy.visitServer()
  })

  beforeEach(() => {
    cy.reload();
  })

  it('Should wait for the element to be avaliable', () => {
    cy.get('#delayed-text').should('not.exist')
    cy.get('#wait-button').click()
    cy.get('#delayed-text').should('exist').type('It works!', delay).should('have.value', 'It works!')
  })

  it('Timeout short', () => {
    cy.get('#delayed-text').should('not.exist')
    cy.get('#wait-button').click()
    cy.get('#delayed-text', { timeout: 1000 }).should('not.exist')
  })

  it('Timeout long', () => {
    cy.get('#delayed-text').should('not.exist')
    cy.get('#wait-button').click()
    cy.get('#delayed-text', { timeout: 6000 }).should('exist')
  })

  it('wait (not recomended)', () => {
    cy.get('#delayed-text').should('not.exist')
    cy.get('#wait-button').click()
    cy.wait(4000)
    cy.get('#delayed-text', { timeout: 1000 }).should('exist')
  })
})