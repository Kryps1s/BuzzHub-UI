describe('Inspection Report', () => {
  it('saves a report after some validations', () => {
    cy.intercept('/graphql', {times:1},{
      "data":{
        "getEvents":
        [
          {
            "eventId": "hp11wDiI",
            "start": "2024-08-31T21:54:00.000Z",
            "type": "BEEKEEPING",
            "name": "CYPRESS E2E",
            "hives": [
                "ROSE"
            ],
            "jobs": [
                "INSPECT"
            ],
            "goal": "\n \npost this to slack.... nevermind it's done automatically now :)",
            "link": "Bziq481c"
        }
      ]
    }
     
    }).as('getInitialData');
    //set data
    cy.visit(Cypress.env('baseUrl'))
    cy.get('#loader' , {timeout : 10000}).should('not.exist')
    cy.contains('Happening today')
    cy.contains('Beekeeping')
    cy.contains('INSPECT').click()
    cy.url().should('include', '/event')
    cy.get('input[type="radio"]').eq(1).click()
    cy.get('#nextStep').click()
    cy.get('#errorMessage')
    cy.get('input[type="checkbox"]').eq(1).click()
    cy.get('#nextStep').click()
    cy.get('button').contains('+').click()
    cy.get('#nextStep').click()
    cy.contains('Box #3').click()
    cy.contains('Frame #2').click()
    cy.contains('Frame #1').click()
    cy.get('#frameItemPicker-0-0').click()
    cy.contains('Honey').click()
    cy.contains('Side A')
    cy.get('#nextStep').click()
    cy.get('textarea').type('cypress e2e test')
    cy.get('button').contains('Submit').click()
    cy.contains('Please log in to complete this action')
    cy.get('button').contains('Log In').click()
    cy.get('input[placeholder="Username"]').type('admin')
    cy.get('input[placeholder="Password"]').type('ilovepetrie123')
    cy.get('button').contains('Login').click()
    cy.contains('Invalid credentials')
    cy.get('input[placeholder="Password"]').clear()
    cy.get('input[placeholder="Password"]').type(Cypress.env('password'))
    cy.get('button').contains('Login').click()
    cy.contains('Login to BuzzHub').should('not.exist')    
    cy.intercept('POST', '/graphql', () => {
    }).as('graphqlRequest');
    
    cy.get('#submitForm').click({ force: true })
    cy.wait('@graphqlRequest').then((interception) => {
      const response = interception.response;
      if (!response) {
        throw new Error('No response from server');
      }
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.property('data'); 
      if (response.body && response.body.data) {
        expect(response.body.data).to.have.property('saveBeekeepingReport');
        expect(response.body.data.saveBeekeepingReport).to.have.property('message');
        expect(response.body.data.saveBeekeepingReport.message).to.equal('successfully saved report and created next inspection');
      }
    });
    cy.contains('🐝')
  })
})