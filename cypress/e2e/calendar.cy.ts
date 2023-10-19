
describe('Basic Calendar Functionality', () => {
  it('opens an inspection in Calendar view', () => {
    cy.visit(Cypress.env('baseUrl'))
    //find the calendar tab
    cy.contains('Log In')
    cy.contains('calendar').click()
    cy.url().should('include', '/calendar', {timeout: 10000})
    //get current month (August 2023)

    const currentMonth = new Date().toLocaleString('default', { year:'numeric', month: 'long' })
    cy.contains(currentMonth)
    cy.contains("#hive").click()
    cy.url().should('include', '/event')
  })
  it('opens an inspection in List view', () => {
    cy.visit(Cypress.env('baseUrl'))
    //find the calendar tab
    cy.contains('Log In')
    cy.contains('calendar').click()
    cy.url().should('include', '/calendar')
    //get current month (August 2023)

    const currentMonth = new Date().toLocaleString('default', { year:'numeric', month: 'long' })
    cy.contains(currentMonth)
    cy.contains('list').click()
    cy.contains("#hive").click()
    cy.url().should('include', '/event')
  })
  it('has a goal when clicked from calendar', () => {
    cy.visit(Cypress.env('baseUrl'))
    //find the calendar tab
    cy.contains('Log In')
    cy.contains('calendar').click()
    //click the event on 22nd
    cy.contains('CYPRESS E2E').click()
    cy.url().should('include', '/event')
    cy.wait(2000)
    cy.get('#checkbox-64df9d1a033d3f5a90e76b9e').click()
    cy.get('#radio-64df9d1a033d3f5a90e76b9e').click()
    cy.get('#nextStep').click()
    cy.contains('How many boxes')
    cy.contains('Notes from last inspection')
  })
  it('persists when refreshed', () => {
    cy.visit(Cypress.env('baseUrl'))
    //find the calendar tab
    cy.contains('Log In')
    cy.contains('calendar').click()
    //click the event on 22nd
    cy.contains('CYPRESS E2E').click()
    cy.url().should('include', '/event')
    cy.reload()
    cy.wait(3000)
    cy.get('#checkbox-64df9d1a033d3f5a90e76b9e').click()
    cy.get('#radio-64df9d1a033d3f5a90e76b9e').click()
    cy.get('#nextStep').click()
    cy.contains('How many boxes')
    cy.contains('Notes from last inspection')
  })
})