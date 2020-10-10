/// <reference types="cypress" />

const delay = { delay: 100 }

describe('Alerts', () => {
  before(() => {
    cy.visitServer()
  })

  beforeEach(() => {
    cy.reload();
  })

  it('show alert', () => {
    cy.get('#alert').click()
    cy.on('window:alert', msg => {
      expect(msg).to.be.equal('Hello there')
    })
  })


  it('alert with commands', () => {
    cy.clickAlert('#alert', 'Hello there')
  })


  it('show alert with stub', () => {
    const stub = cy.stub().as('alerty')
    cy.on('window:alert', stub)
    cy.get('#alert').click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Hello there')
    })
  })
})