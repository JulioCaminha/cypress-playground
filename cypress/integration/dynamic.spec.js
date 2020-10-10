/// <reference types="cypress" />

const delay = { delay: 100 }

describe('Dynamic test', () => {
  before(() => {
    cy.visitServer()
  })

  beforeEach(() => {
    cy.reload();
  })

  const pizzas = ['calabresa', 'portuguesa', 'marguerita', 'muzzarela']

  pizzas.forEach(pizza => {
    it(`Pizza selection ${pizza}`, () => {
      cy.fixture('formData').then((data) => {
        cy.get('#formFirstName').type(data.firstName, delay)
        cy.get('#formLastName').type(data.lastName, delay)
        cy.get('#formDescription').type(data.description, delay)
        cy.get(`[name=gender][value=${data.gender}]`).click()
        cy.get(`[name=pizza][value=${pizza}]`).click()
        cy.get('#mui-component-select-celeste').click().get(`[name=languages][data-value=${data.language}]`).click()
      })
      cy.get('#formSubmit').click()
      cy.get('#result').should('contain', 'Success !')
    })
  })

  it('Select all with forEach', () => {
    pizzas.forEach(pizza => {
      cy.get(`[name=pizza][value=${pizza}]`).click()
    })
    pizzas.forEach(pizza => {
      cy.get(`[name=pizza][value=${pizza}]`).should('be.checked')
    })
  })

  it('Select all with each', () => {
    cy.get('[name=pizza]').each(element => {
      if(element.val() !== 'calabresa') {
        cy.wrap(element).click()
      }
    })

    pizzas.forEach(pizza => {
      cy.get(`[name=pizza][value=${pizza}]`).then(el => {
        if (pizza === 'calabresa') {
          cy.wrap(el).should('not.be.checked')
        } else {
          cy.wrap(el).should('be.checked')
        }
      })
    })
  })
})