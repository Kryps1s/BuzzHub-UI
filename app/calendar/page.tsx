import { NextPage } from "next";
import Layout from "../layouts/homeLayout";
import CalendarContainer from "../components/calendarContainer";
import { EventType, Event } from "../lib/types";
import { use } from "react";

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
  const GetUpcomingMeetings = `
    query MyQuery($dateRange: [String] = ["2023-07-01T00:00:00.000Z", "2023-07-31T00:00:00.000Z"]) {
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
  }
  
    `;
  if( process.env.API_URL && process.env.API_KEY ) {
    const res = await fetch( process.env.API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": process.env.API_KEY
      },
      body: JSON.stringify( {
        query: GetUpcomingMeetings,
        variables: {
          limit: 2,
          type: EventType.MEETING
        }
      } )
    } );
    const json = await res.json();
    //check for graphQl errors
    if ( json.errors ) {
      console.error( json.errors );
      return {
        error: json.errors[0].message
      };
    }
    return { data:json.data.getEvents };
  } else {
    console.error( "API_URL and API_KEY not set" );
    return {
      error: "API_URL and API_KEY not set"
    };
  }
};
export default Page;