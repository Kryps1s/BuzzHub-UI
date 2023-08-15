import { NextPage } from "next";
import Layout from "../layouts/headerContent";
import CalendarContainer from "../components/calendarContainer";
import { EventType, Event } from "../lib/types";
import { use } from "react";
import { POST } from "../api/graphql/route";

const Page: NextPage = () => {
  const events = use ( getData() );
  if( events.error ) {
    return (
      <Layout>
        <div className="w-full sm:w-7/8 2xl:w-3/4 mx-auto">
          <h1 className="text-2xl text-center">Error</h1>
          <p className="text-center">{events.error}</p>
        </div>
      </Layout>
    );
  }
  events.data = events.data
    .map( ( event: Event ) => ( {
      title:
      event.name
        ? event.name
        : event.type === EventType.MEETING && event.isMonthly
          ? `${event.type} ${event.location} - (Monthly Check-in)`
          : `${event.type} - ${event.location}`,
      start: new Date( event.start ).toISOString().split( "T" )[0],
      backgroundColor: event.type === EventType.BEEKEEPING ? "#FF0000" : "#1234FF"
    } ) );

  return (
    <Layout>
      <CalendarContainer events={events.data} />
    </Layout>
  );
};

const getData = async () => {
  const firstDayOfCurrentMonth = new Date( new Date().getFullYear(), new Date().getMonth(), 1 ).toISOString().slice( 0, 10 );
  const lastDayOfCurrentMonth = new Date( new Date().getFullYear(), new Date().getMonth() + 1, 0 ).toISOString().slice( 0, 10 );
  const req = new Request( "http://buzzhub.com", {
    method: "POST",
    body:JSON.stringify( {
      query: `
      query MyQuery($dateRange: [String] = ["${firstDayOfCurrentMonth}T00:00:00.000000Z", "${lastDayOfCurrentMonth}T00:00:00.000000Z"]) {
        getEvents(dateRange: $dateRange) {
          start
          type
          ... on MeetingEvent {
            location
            isMonthly
          }
          ... on BeekeepingEvent {
            name
          }
      }
    }`,
      variables: {
      }
    } )
  } );
  try{
    const res = await POST( req );
    return { data: res.getEvents };
  }
  catch( err : unknown ) {
    if( err instanceof Error ) {
      return { error: err.message };
    }
    else{
      console.error( err );
      return { error: "Unknown error" };
    }
  }
};
export default Page;