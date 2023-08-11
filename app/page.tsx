import Layout from "./layouts/headerContent";
import { NextPage, Metadata } from "next";
import { EventCard } from "./lib/types";
import { use } from "react";
import EventContextBar from "./components/eventContextBar";
import EventRow from "./components/eventRow";
import { POST } from "./api/graphql/route";

export const metadata: Metadata = {
  title: "BuzzHub",
  icons: "/favicon.ico"
};

const demoCard: EventCard = {
  "type": "BEEKEEPING",
  "eventId": "w8u8B3L",
  "image": "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
  "jobs": [
    "TREAT",
    "HARVEST"
  ],
  "name": "test"
} ;
const demoCard2: EventCard = {
  "type": "BEEKEEPING",
  "eventId": "w8u8B2CL",
  "image": "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
  "jobs": [
    "NUC",
    "HARVEST"
  ],
  "name": "test2"
} ;
const demoEvents = [ demoCard, demoCard2, demoCard ];

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
  return (
    <Layout>
      <div className="w-full flex flex-col align-middle justify-center">
        <EventRow events={events.data} title="Happening Now" />
        <EventContextBar />
        <EventRow events={demoEvents} title="Beekeeping (Examples - Work in Progress!)" seeAll={true} />
        <EventRow events={demoEvents} title="Collective (Examples - Work in Progress!)" seeAll={true}/>
      </div>

    </Layout>
  );
};
const getData = async () => {
  const today = new Date().toISOString().split( "T" )[0];
  const tomorrow = new Date( Date.now() + 86400000 ).toISOString().split( "T" )[0];
  const req = new Request( "http://buzzhub.cc", {
    method: "POST",
    body:JSON.stringify( {
      query: `
      query GetEvents {
        getEvents(
            limit: 3
            dateRange: ["${today}T00:00:00.000000Z", "${tomorrow}T00:00:00.000000Z"]        
            ) {
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

