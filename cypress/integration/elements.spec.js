/// <reference types="cypress" />

const delay = { delay: 100 }

describe('Text Elements', () => {
  before(() => {
    cy.visitServer()
  })

  beforeEach(() => {
    cy.reload();
  })

  it('find text', () => {
    cy.get('body').should('contain', 'PLAYGROUND')
    cy.get('h1').should('contain', 'PLAYGROUND')
    cy.get('.playground-title').should('have.text', 'CYPRESS PLAYGROUND')
  })

  it('links', () => {
    cy.get("#cy-back-text").should('have.not.text', "I'm Back !")
    cy.get('a').click()
    cy.get("#cy-back-text").should('have.text', "I'm Back !")
  })

  it('text fields', () => {
    const text = 'Cypress Test';
    cy.get('#formFirstName').type(text, delay)
    cy.get('#formFirstName').should('have.value', text)
  })

  it('text areas', () => {
    const text = 'asdasdasdasd'
    cy.get('#formDescription').type(text, delay)
    cy.get('#formDescription').should('have.value', text)
  })

  it('keyboard inputs', () => {
    cy.get('#formLastName')
      .clear()
      .type('Wrong{selectall}Right', delay)
      .should('have.value', 'Right')
  })

  it('RadioButton', () => {
    cy.get("#formGenderFem")
      .click()
      .should('be.checked')

    cy.get("#formGenderMasc").should('not.be.checked')
    cy.get("[name='gender']").should('have.length', 2)

    cy.get('[name=gender]').then(arr => {
      let values = []
      arr.each(function() {
        values.push(this.value)
      })
      expect(values).to.include.members(['male', 'female'])
    })
    // .invoke('val').should('eql', ['male', 'female'])
  })

  it('CheckBox', () => {
    cy.get("#formCalabresa")
      .click()
      .should('be.checked')

      cy.get('[name=pizza]').click({ multiple: true })
      cy.get('#formCalabresa').should('not.be.checked')
      cy.get('#formMuzzarela').should('be.checked')
  })

  it('Combo (selects)', () => {
    cy.get('#mui-component-select-celeste').click().get('#celeste-ruby').click().should('have.text', 'Ruby')
    cy.get('#mui-component-select-celeste').click().get('#celeste-javascript').click().should('have.text', 'Javascript')
    cy.get('#mui-component-select-celeste').click().get('#celeste-python').click().should('have.text', 'Python')
    cy.get('#mui-component-select-celeste').click().get('#celeste-c').click().should('have.text', 'C++')
    cy.get('#mui-component-select-celeste').click().get('#celeste-c').click().should('not.have.text', 'Ruby')
    // Normal select (not material)
    // cy.get('[name=celeste]').select('c++').should('have.value', 'c++')
  })
})