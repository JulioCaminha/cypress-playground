/// <reference types="cypress" />

const delay = { delay: 200 }

describe('Fixtures', () => {
  it('get data from fixture file', () => {
    cy.visitServer()
    cy.fixture('formData').then((data) => {
      cy.get('#formFirstName').type(data.firstName, delay)
      cy.get('#formLastName').type(data.lastName, delay)
      cy.get('#formDescription').type(data.description, delay)
      cy.get(`[name=gender][value=${data.gender}]`).click()
      cy.get(`[name=pizza][value=${data.favoritePizza}]`).click()
      cy.get('#mui-component-select-celeste').click().get(`[name=languages][data-value=${data.language}]`).click()
    })
    cy.get('#formSubmit').click()
    cy.get('#result').should('contain', 'Success !')
  })
})