import { NextPage } from "next";
import Layout from "../layouts/homeLayout";
import CalendarContainer from "../components/calendarContainer";
import { EventType, Event } from "../lib/types";
import { use } from "react";
import GRAPHQL from "../lib/graphql";

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
  const req = JSON.stringify( {
    query: `
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
    }`,
    variables: {
      limit: 2,
      type: EventType.MEETING
    }
  } );
  try{
    const res = await GRAPHQL( req );
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