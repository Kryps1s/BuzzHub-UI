import { TrelloMember } from '@/app/lib/types/types'
import MeetingDetails from '../../app/[locale]/components/meeting/details'

describe('<meetingDetails/>', () => {


        interface MeetingDetailsProps {
            details: {
                date: Date;
                roles: { name: string; value: TrelloMember }[];
                id: string;
            };
            trelloMembers: TrelloMember[];
        }
    

    const props: MeetingDetailsProps = {
                details: {
                    date: new Date(),
                    roles: [{ name: "Facilitator", value: { fullName: "fullName", id: "123", username: "username" } },
                            { name: "Jockey", value: { fullName: "fullName", id: "123", username: "username" } },
                            { name: "Scribe", value: { fullName: "fullName", id: "123", username: "username" } }],
                    id: "id"
                },
                trelloMembers: [{ fullName: "fullName", id: "123", username: "username" },
                                { fullName: "test", id: "456", username: "username2" },
                                { fullName: "test user 2", id: "789", username: "username3" },
                                { fullName: "fullName4", id: "101112", username: "username4" }]
            };
    const mountMeetingDetails = (details: { date: Date; roles: { name: string; value: TrelloMember }[]; id: string } = props.details, trelloMembers: TrelloMember[] = props.trelloMembers) => {
        cy.mount(<MeetingDetails details={details} trelloMembers={trelloMembers} />);
    };

  it('renders', () => {
    mountMeetingDetails();
    cy.contains('Next Meeting');
    cy.contains('Roles')
    cy.contains('fullName')
    cy.contains('Facilitator')
    cy.contains('Jockey')
    cy.contains('Scribe')
    cy.get('.tabler-icon').should('have.length', 3)
    })

    it('renders with missing roles', () => {
        const details = {
            date: new Date(),
            roles: [{ name: "Facilitator", value: { fullName: "fullName", id: "id", username: "username" } },
            { name: "Jockey", value: { fullName: "fullName", id: "id", username: "username" } }],
            id: "id"
        };
        mountMeetingDetails(details);
        cy.contains('Next Meeting');
        cy.contains('Roles')
        cy.contains('fullName')
        cy.contains('Facilitator')
        cy.contains('Jockey')
        cy.get('.tabler-icon').should('have.length', 2)
    })

    it ('renders with no roles', () => {
        const details = {
            date: new Date(),
            roles: [],
            id: "id"
        };
        mountMeetingDetails(details);
        cy.contains('Next Meeting');
        cy.contains('Roles').should('not.exist')
        cy.contains('fullName').should('not.exist')
        cy.get('.tabler-icon').should('have.length', 0)
        cy.contains('No roles found')
    })

    it('renders reassignment modal', () => {
        mountMeetingDetails();
        cy.get('.tabler-icon').first().click()
        cy.contains('Reassign Facilitator')
        cy.contains('Assign')
        cy.contains('Close')
        cy.get('#assignModal').should('be.disabled')

    })

    it('can not select the selected role', () => {
        mountMeetingDetails();
        cy.get('.tabler-icon').first().click()
        cy.get('#radio-123').should('be.disabled')
    })

    it('can select a new member', () => {
        mountMeetingDetails();
        cy.get('.tabler-icon').first().click()
        cy.get('#radio-456').click()
        cy.get('#radio-456').should('be.checked')
        cy.get('#assignModal').should('not.be.disabled')
    })

    it('cannot assign a new member without logging in', () => {
        mountMeetingDetails();
        cy.get('.tabler-icon').first().click()
        cy.get('#radio-456').click()
       cy.get('#assignModal').click()
       cy.wait(4000)
        cy.contains('Reassign Facilitator')
    })

    it('can assign a new member', () => {
    cy.intercept('POST', "**/graphql", { data: { updateEvent: "success" } }).as('assignRole')

        mountMeetingDetails();
        cy.get('.tabler-icon').first().click()
        cy.get('#radio-456').click()
        cy.get('#assignModal').click()
        cy.contains('Assign')
        cy.get('#assignModal').click()
        cy.wait('@assignRole')
        cy.contains('Reassign Facilitator').should('not.exist')
        cy.contains('test')
    })

    it('can close the modal', () => {
        mountMeetingDetails();
        cy.get('.tabler-icon').first().click()
        cy.get('#closeModal').click()
        cy.contains('Reassign Facilitator').should('not.exist')
    })
    
 })

