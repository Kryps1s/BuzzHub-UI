import { NextPage } from "next";
import Layout from "../layouts/headerContent";
import type { Metadata } from "next";
import MeetingDetails from "../components/meeting/details";
import MeetingAgenda from "../components/meeting/agenda";
import MeetingCopyButton from "../components/meeting/copyButton";
import { POST } from "../api/graphql/route";
import { use } from "react";
import { Agenda, TrelloMember, MeetingAgendaDetails, Event } from "../lib/types/types";

export const metadata: Metadata = {
  title: "BuzzHub - Meeting",
  icons: "/favicon.ico"
};

const parseAgenda = ( agenda: Agenda, trelloMembers:TrelloMember[] ) => {
  // Convert each Trello member ID to a participant
  // For each key in agenda, convert each event to a meeting
  // console.log( `agenda: ${JSON.stringify(data.meet)}` );
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
    let member = trelloMembers.find( ( member ) => member.id === role.user.id );
    if ( !member ) {
      member = { fullName: "", id: "", username: "" };
    }
    return { name: role.roleName, value: member };
  } );
  //return a date that includes the day of the week, the month, and the day, and the time
  newDetails.date = new Date( details.start ).toLocaleDateString( "en-CA", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: true
  } );
  newDetails.id = details.eventId;
  newDetails.location = details.location ?? "";
  newDetails.isMonthly = details.isMonthly ?? false;
  return newDetails;
};

const Page: NextPage = () => {
  const data = use( getData() ) as { meetingDetails: Event, meetingAgenda: Agenda, trelloMembers: TrelloMember[], error?: string };
  //TODO: get agenda, for now use fake demoAgenda
  if( "error" in data ) {
    return (
      <Layout>
        <div>{data.error}</div>
      </Layout>
    );
  }
  const agenda = parseAgenda( data.meetingAgenda, data.trelloMembers );
  const details = parseDetails( data.meetingDetails, data.trelloMembers );
  return (
    <Layout>
      <MeetingDetails details={details} trelloMembers={data.trelloMembers} />
      <MeetingCopyButton agenda={agenda} details={details} />
      <MeetingAgenda agenda={agenda} />
    </Layout>
  );

};

const getData = async () => {
  const req = new Request( "http://buzzhub.com", {
    method: "POST",
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
        getEvents(future: true, type: MEETING, limit: 1) {
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
            unassigned {
              ...AgendaEventFields
            }
            inProgress {
              ...AgendaEventFields
            }
            completed {
              ...AgendaEventFields
            }
          }
      
          COLLECTIVE {
            unassigned {
              ...AgendaEventFields
            }
            inProgress {
              ...AgendaEventFields
            }
            completed {
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
    return { meetingDetails: res.getEvents[0],
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
