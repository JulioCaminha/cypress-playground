Cypress.Commands.add("clickAlert", (locator, message) => {
  cy.get(locator).click()
  cy.on('window:alert', msg => {
    expect(msg).to.be.equal(message)
  })
})

Cypress.Commands.add("visitServer", (locator, message) => {
  cy.visit('http://127.0.0.1:8081')
})
