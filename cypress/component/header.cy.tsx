import { Header } from '../../app/components/header/header'

describe('<Header/>', () => {

  beforeEach(() => {
    cy.mount(<Header tabs={["home", "calendar", "meeting", "collective"]} />)
    cy.viewport(1920, 1080)
  })

  it('renders', () => {
    cy.contains('home');
    cy.contains('calendar')
    cy.contains('meeting')
    cy.contains('collective')
    cy.contains('Log In')
    cy.get('img')
  })

  it('hides titles on mobile', () => {
    cy.viewport(375, 667)
    cy.get('#navItemLabel').should('have.class', 'hidden');
  })

  it('shows admin on login', () => {
    cy.get('#loginModalOpen').click()
    cy.get('#username').type('admin')
    cy.get('#password').type('admin')
    cy.get('#loginButton').click()
    cy.intercept('POST', '**/graphql', {
      statusCode: 200,
      body: {
        data: {
          login: {
            access_token: '123',
            name: 'admin'
          }
        }
      }
    })
    cy.contains('admin')
  })

  it('shows login error message', () => {
    cy.get('#loginModalOpen').click()
    cy.get('#username').type('admin')
    cy.get('#password').type('admin')
    cy.intercept('POST', '**/graphql', {
      statusCode: 400,
      body: {
        errors: [
          {
            message: 'test error message'
          }
        ]
      }
    })
    cy.get('#loginButton').click()
    cy.contains('test error message')
  })

  it('does not show spinner when login modal opens', () => {
    cy.get('#loginModalOpen').click()
    cy.get('#loginLoader').should('not.exist')
  })

  it('shows spinner when login button is clicked', () => {
    cy.get('#loginModalOpen').click()
    cy.get('#loginButton').click()
    cy.get('#loginLoader')
  });

  it('disables login button when loading', () => {
    cy.get('#loginModalOpen').click()
    cy.get('#loginButton').click()
    cy.get('#loginButton').should('be.disabled')
  });
})