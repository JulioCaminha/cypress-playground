/// <reference types="cypress" />

import { format } from '../../src/components/shared/time';

const delay = { delay: 100 }

describe('Time', () => {

  before(() => {
    cy.visitServer()
  })

  beforeEach(() => {
    cy.reload();
  })

  it('check time', () => {
    const time = format(new Date())
    cy.get('[cy-data=time-button]').click()
    cy.get('#time-result').should('have.text', time)
  })

  it('travels back in  time', () => {
    const date = new Date('12/25/2017')
    cy.clock(date.getTime())
    cy.get('[cy-data=time-button]').click()
    cy.get('#time-result').should('have.text', '25/12/2017')
  })

  it('goes to the future', () => {
    const date = new Date('12/25/2017')
    cy.clock(date.getTime())
    cy.get('[cy-data=time-button]').click()
    cy.get('#time-result').should('have.text', '25/12/2017')
    cy.tick(60000*60*24) //1 day
    cy.get('[cy-data=time-button]').click()
    cy.get('#time-result').should('have.text', '26/12/2017')
  })
})