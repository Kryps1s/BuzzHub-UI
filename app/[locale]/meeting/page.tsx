import { NextPage } from "next";
import Layout from "../layouts/headerContent";
import type { Metadata } from "next";
import MeetingDetails from "../components/meeting/details";
import MeetingAgenda from "../components/meeting/agenda";
import MeetingCopyButton from "../components/meeting/copyButton";
import { POST } from "@/app/[locale]/api/graphql/route";
import { use } from "react";
import { Agenda, TrelloMember, MeetingAgendaDetails, Event } from "../../lib/types/types";
import ErrorMessage from "@/app/[locale]/components/error";
import Message from "./components/message";

export const metadata: Metadata = {
  title: "BuzzHub - Meeting",
  icons: "/favicon.ico"
};

const parseAgenda = ( agenda: Agenda, trelloMembers:TrelloMember[] ) => {
  // Convert each Trello member ID to a participant
  // For each key in agenda, convert each event to a meeting
  Object.keys( agenda ).forEach( ( categoryKey ) => {
    const category = agenda[categoryKey as keyof Agenda];

    Object.keys( category ).forEach( ( subcategoryKey ) => {
      const subcategory = category[subcategoryKey];

      subcategory.forEach( ( task ) => {
        if ( !task.participants ) {
          task.participants = [];
        }

        task.participants = task.participants.map( ( participantId ) => {
          const member = trelloMembers.find( ( member ) => member.id === participantId );
          return member ? member.fullName : participantId;
        } );
      } );
    } );
  }
  );
  return agenda;
};

const parseDetails = ( details: Event, trelloMembers:TrelloMember[] ) : MeetingAgendaDetails<TrelloMember> => {
  // Convert each Trello member ID to a participant
  // For each key in agenda, convert each event to a meeting
  const newDetails = {} as MeetingAgendaDetails<TrelloMember>;
  if ( !details?.roles ) {
    details.roles = [];
  }
  newDetails.roles = details.roles.map( ( role ) => {
    if( !role.user ) {
      return { name: role.roleName, value: { fullName: "Unknown", id: "Unknown", username: "Unknown" } };
    }
    let member = trelloMembers.find( ( member ) => member.id === role.user.id );
    if ( !member ) {
      member = { fullName: "", id: "", username: "" };
    }
    return { name: role.roleName, value: member };
  } );
  //return a date that includes the day of the week, the month, and the day, and the time
  newDetails.date = new Date( details.start );
  newDetails.id = details.eventId;
  newDetails.location = details.location ?? "";
  newDetails.isMonthly = details.isMonthly ?? false;
  return newDetails;
};

const Page: NextPage = () => {
  const data = use( getData() ) as { meetingDetails: Event, meetingAgenda: Agenda, trelloMembers: TrelloMember[], nextMeetingDetails: Event, error?: string };
  if( "error" in data ) {
    return (
      <Layout>
        <ErrorMessage error={data.error}/>
      </Layout>
    );
  }
  const agenda = data.meetingAgenda ? parseAgenda( data.meetingAgenda, data.trelloMembers ) : undefined;
  const details = data.meetingDetails ? parseDetails( data.meetingDetails, data.trelloMembers ) : undefined;
  const nextDetails = data.nextMeetingDetails ? parseDetails( data.nextMeetingDetails, data.trelloMembers ) : undefined;
  return (
    <Layout>
      { !details ? <header className="flex flex-col align-middle justify-center"><section className="mx-auto">
        {/* <h1 className="text-xl" >No meetings scheduled at the moment</h1> */}
        <Message message={"noMeetingsFound"} />
      </section></header> :
        <MeetingDetails details={details} trelloMembers={data.trelloMembers} />}
      {details && agenda && <MeetingCopyButton agenda={agenda} details={details} next={nextDetails} />}
      {!agenda ? <section className="flex flex-col align-middle justify-center"><section className="mx-auto">
        <Message message={"meetingLoadError"} />
      </section></section> :
        <MeetingAgenda agenda={agenda} />}
    </Layout>
  );

};

const getData = async () => {

  const req = new Request( "http://buzzhub.com", {
    method: "POST",
    cache: "no-cache",
    body:JSON.stringify( {
      query: `
      fragment MeetingEventFields on MeetingEvent {
        isMonthly
        location
      }
      
      fragment AgendaEventFields on AgendaEvent {
        name
        start
        idList
        participants
        labels
        eventId
      }
      
      query MyQuery {
        getEvents(future: true, type: MEETING, limit: 2) {
          name
          eventId
          start
          ...MeetingEventFields
          ... on MeetingEvent {
            location
            roles {
                roleName
                user {
                    id
                    fullName
                    username
                }
            }
        }
        }
      
        getMeetingAgenda {
          BEEKEEPING {
            completed {
              ...AgendaEventFields
            }
            inProgress {
              ...AgendaEventFields
            }
            unassigned {
              ...AgendaEventFields
            }
          }
      
          COLLECTIVE {
            completed {
              ...AgendaEventFields
            }
            inProgress {
              ...AgendaEventFields
            }
            unassigned {
              ...AgendaEventFields
            }
          }
        }
      
        getTrelloMembers {
          fullName
          id
          username
        }
      }
      `,
      variables: {}
    } )
  } );
  try{
    const res = await POST( req );
    return {
      meetingDetails: res.getEvents[0],
      nextMeetingDetails: res.getEvents[1],
      meetingAgenda: res.getMeetingAgenda,
      trelloMembers: res.getTrelloMembers };
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
