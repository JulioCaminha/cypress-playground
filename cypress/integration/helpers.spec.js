/// <reference types="cypress" />

describe('Helpers', () => {
  before(() => {
    cy.visitServer()
  })

  beforeEach(() => {
    cy.reload();
  })
  it('Wrap basic', () => {
    const obj = { name: 'User', age: 20}
    expect(obj).to.have.property('name', 'User')
    expect(obj).to.have.property('age', 20)
    cy.wrap(obj).should('have.property', 'name')
  })

  it('Wrap then', () => {
    cy.get('#formFirstName').type('funciona?').should('have.value', 'funciona?')
    cy.get('#formFirstName').then(element => {
      cy.wrap(element).type('mesmo?').should('have.value', 'funciona?mesmo?')
    })
  })

  it('Wrap Promises', () => {
    const promise = new Promise((resolve, _reject) => {
      setTimeout(() => {
        resolve(10)
      }, 2000);
    })

    cy.get('#buttonBasic').then(() => console.log('First button found'))
    cy.wrap(promise).then(ret => console.log(ret))
    cy.get('#wait-button').then(() => console.log('Second button found'))
  })

  it('Wrap vs should', () => {
    cy.wrap(1).then(() => {
      return 2
    }).should('be.equal', 2)

    cy.wrap(1).should(() => {
      return 2
    }).should('be.equal', 1)
  })

  it('Its', () => {
    const obj = { name: 'User', age: 20, address: { street: 'golden street' } }
    cy.wrap(obj).should('have.property', 'name', 'User')
    cy.wrap(obj).its('name').should('be.equal', 'User')
    cy.wrap(obj).its('address').should('have.property', 'street')
    cy.wrap(obj).its('address').its('street').should('contain', 'golden')
    cy.wrap(obj).its('address.street').should('contain', 'golden')

    cy.title().its('length').should('be.equal', 13)
  })

  it('Inoke', () => {
    const invokeText = 'Text through invoke'
    const getValue = () => 1;
    const sum = (a,b) => a + b;
    cy.wrap({ fn: getValue }).invoke('fn').should('be.equal', 1)
    cy.wrap({ fn: sum }).invoke('fn', 2, 5).should('be.equal', 7)
    cy.get('#formFirstName').invoke('val', invokeText).should('have.value', invokeText)
    cy.window().invoke('alert', 'Hello!')
  })
})