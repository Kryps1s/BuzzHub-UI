import JobForm from "@/app/[locale]/components/jobForm";

describe('Inspection Form Tests', () => {


    beforeEach(() => {
        cy.viewport(1920, 1080)
        const trelloMembers = [
            {
                id: '123',
                username: 'testuser',
                fullName: 'test user'
            },
            {
                id: '456',
                username: 'testuser2',
                fullName: 'test user 2'
            },
            {
                id: '789',
                username: 'testuser3',
                fullName: 'test user 3'
            }
        ]

        cy.mount(<JobForm id="123" trelloMembers={trelloMembers} jobs={["INSPECT"]} />)
    })

    it('renders', () => {
        cy.get('#stepper').should('exist')
        cy.contains('Full Name');
        cy.contains('test user');
    })

    it('does not open a box by defualt', () => {
        cy.get('#notes').click()
        //accordion chevron with attribute data-rotate="true" should not exist
        cy.get('[data-rotate="true"]').should('not.exist')
    })

    it('does not go to step 2 if no members are selected', () => {
        cy.get('#nextStep').click()
        cy.get('#errorMessage').should('exist')
    })
    it('does not go to step 2 if no leader selected', () => {
        cy.get('#checkbox-123').click()
        cy.get('#nextStep').click()
        cy.get('#errorMessage').should('exist')
    })

    it('does not go to another step through the stepper if no members', () => {
        cy.get('#notes').click()
        cy.get('#errorMessage').should('exist')
    })
    
    it('goes to step 2 if members and leader are selected', () => {
        cy.get('#checkbox-123').click()
        cy.get('#radio-123').click()
        cy.get('#nextStep').click()
        cy.get('#errorMessage').should('not.exist')
    })

    it('only adds frame items to the correct frame', () => {
        cy.get('#checkbox-123').click()
        cy.get('#radio-123').click()
        cy.get('#notes').click()
        cy.contains('Box #2').should('exist').click()
        cy.contains('Frame #1').should('exist').click()
        cy.get('#frameItemPicker-0-0').click()
        cy.contains('Drone Cells').click()
        cy.get('body').type('{esc}')
        cy.get('#backStep').click()
        cy.get('#nextStep').click()
        cy.contains('Box #2').should('exist').click()
        cy.contains('Frame #1').should('exist').click()
        cy.contains('Destroyed').should('exist')
        cy.contains('Frame #1').should('exist').click()
        cy.contains('Frame #2').should('exist').click()
        cy.get('#frameItem-0-1').should('not.exist')
    })

})
