import { RowType, Event } from "../types/types";

export const getEvent = ( events: Event[], type : RowType, index : number, past = false ) : Event => {
  const today = new Date().toISOString().slice( 0, 10 );

  // Function to filter events by date
  const filterByDate = ( event: Event, past: boolean ) => {
    const eventDate = new Date( event.start );
    const currentDate = new Date();
    if ( past ) {
      return eventDate < currentDate;
    } else {
      return eventDate >= currentDate;
    }
  };
  // Filter events based on the RowType
  const filteredEvents = events.filter( event => {
    switch ( type ) {
    case RowType.TODAY:
      return event.start.split( "T" )[0] === today;
    case RowType.BEEKEEPING:
      return event.type === "BEEKEEPING" && filterByDate( event, past );
    case RowType.COLLECTIVE:
      return ( event.type === "COLLECTIVE" || event.type === "MEETING" ) && filterByDate( event, past );
    default:
      return false; // Handle cases not covered by other cases
    }
  } );
  filteredEvents.sort( ( a, b ) => past && type !== "TODAY" ? new Date( b.start ).getTime() - new Date( a.start ).getTime() //reverse sort
    : new Date( a.start ).getTime() - new Date( b.start ).getTime() );
  return filteredEvents[index];
};