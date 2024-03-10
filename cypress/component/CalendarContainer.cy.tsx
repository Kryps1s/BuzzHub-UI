import CalendarContainer from "@/app/[locale]/components/calendarContainer"
import { CalendarEvent } from "@/app/lib/types/types"

describe('CalendarContainer.cy.tsx', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
    const events: CalendarEvent[] = [
      {
        title: 'test event',
        start: new Date().toISOString(),
        backgroundColor: 'red',
        url: '/event/123'
      }
  ]
    cy.mount(<CalendarContainer events={events} />)
  })
  it('displays a calendar', () => {
    cy.get('.fc')
  })
  it('displays an event', () => {
    cy.get('.fc-event')
    cy.get('.fc-event-title').contains('test event')
  })
  it('has list and month view', () => {
    cy.get('.fc-listMonth-button')
    cy.get('.fc-dayGridMonth-button')
  }
  )
  it('switches to list view', () => {
    cy.get('.fc-listMonth-button').click()
    cy.get('.fc-list-event-title').contains('test event')
  })
})