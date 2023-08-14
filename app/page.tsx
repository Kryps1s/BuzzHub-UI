import Layout from "./layouts/headerContent";
import { NextPage, Metadata } from "next";
import { use } from "react";
import EventContextBar from "./components/eventContextBar";
import EventRow from "./components/eventRow";
import { POST } from "./api/graphql/route";

export const metadata: Metadata = {
  title: "BuzzHub",
  icons: "/favicon.ico"
};

const Page: NextPage = () => {
  const events = use ( getData() );
  const getEvents = ( type : string ) => {
    //get past and upcoming events by type
    type Event = {
      type: string;
    };
    return {
      past : events.past.filter( ( event : Event ) => event.type === type ),
      upcoming : events.upcoming.filter( ( event : Event ) => event.type === type )
    };
  };
  const beekeepingEvents = getEvents( "BEEKEEPING" );
  const collectiveEvents = getEvents( "MEETING" );
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
  return (
    <Layout>
      <div className="w-full flex flex-col align-middle justify-center">
        <EventRow events={events.happeningNow} title="Happening Now" />
        <EventContextBar />
        <EventRow events={beekeepingEvents} title="Beekeeping " seeAll={true} />
        <EventRow events={collectiveEvents} title="Collective " seeAll={true}/>
      </div>

    </Layout>
  );
};
const getData = async () => {
  const today = new Date().toISOString().split( "T" )[0];
  const tomorrow = new Date( Date.now() + 86400000 ).toISOString().split( "T" )[0];
  const req = new Request( "http://buzzhub.com", {
    method: "POST",
    body:JSON.stringify( {
      query: `
      fragment EventDetails on Event {
        name
        start
        type
        eventId
        ... on BeekeepingEvent {
          hives
          jobs
        }
        ... on MeetingEvent {
          location
        }
      }
      
      query GetEvents {
        happeningNow: getEvents(
          dateRange: ["${today}T00:00:00.000000Z", "${tomorrow}T00:00:00.000000Z"]
        ) {
          ...EventDetails
        },
        upcoming: getEvents(
          future: true
          limit: 3
        ) {
          ...EventDetails
        }
        past: getEvents(
          future: false
          limit: 3
        ) {
          ...EventDetails
        }
      }
      `,
      variables: {
      }
    } )
  } );
  try{
    const res = await POST( req );
    return res ;
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

