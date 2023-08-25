import React from 'react'
import EventRow from '../../app/components/eventRow'
import { RowType } from '../../app/lib/types/types'
import { createEvents } from '../../fixtures/events'
import { SWRConfig } from 'swr'


const testProps = {
  seeAll: true,
  type: 'COLLECTIVE' as RowType,
}

describe('<EventRow />', () => {
  it('renders a collective row', () => {

    cy.mount(
        <SWRConfig value={{ dedupingInterval: 0}}>
          <EventRow {...testProps}  />
        </SWRConfig>
      )
    cy.intercept('POST', "**/graphql", { data: { getEvents: createEvents(["MEETING"],["past","today","future"] ) } }).as('getEvents')
    cy.get('#loader')
    cy.contains('See all')
    cy.contains('Collective')
    cy.contains('Petrie')
    cy.contains('12:00 a.m')
    cy.get('#speakerphone')
    cy.get('#tool')
    cy.get('#pencil')
  })

  it('renders a row with no events', () => {
    cy.mount(
      <SWRConfig value={{ dedupingInterval: 0}}>
        <EventRow {...testProps}  />
      </SWRConfig>
    )
    cy.intercept('POST', "**/graphql", { data: { getEvents: createEvents([""],["past","today","future"] ) } }).as('getEvents')
    cy.get('#loader').should('not.exist')
    cy.get('.mantine-Paper-root').should('have.length', 0)

  })

  it('renders 2 events', () => {
    cy.mount(
      <SWRConfig value={{ dedupingInterval: 0}}>
        <EventRow {...testProps}  />
      </SWRConfig>
    )
      cy.intercept('POST', "**/graphql", { data: { getEvents: createEvents(["MEETING"],["future"] ).slice(1,3) } }).as('getEvents')
      cy.get('.mantine-Paper-root').should('have.length', 2)
  })

  it('renders a row with an error', () => {

      cy.intercept('POST', "**/graphql", { errors: [
        {
            "errorType": "UnauthorizedException",
            "message": "This is an error test."
        }
      ] }).as('getEvents')
    cy.mount(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <EventRow {...testProps}  />
      </SWRConfig>
    )
      cy.contains('This is an error test.')
  })
})