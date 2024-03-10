"use client";
import { createStyles, Paper, Text, Title } from "@mantine/core";
import Link from "next/link";
import { Event, RowType } from "../../../lib/types/types";
import { getEvent } from "@/app/lib/services/eventService";
import Skeleton from "./skeleton";
import { useSelectedTabStore } from "../../store/selectedTab";
import useEventsStore from "../../store/events";
import { IconTool, IconSpeakerphone, IconPencil } from "@tabler/icons-react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import useSWR from "swr";
import Error from "./errorMessage";
import { request } from "graphql-request";
import EventNotesModal from "./eventNotes";
import { getCookie } from "cookies-next";
import { useTranslations } from "next-intl";

const useStyles = createStyles( ( theme ) => ( {

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase"
  }
} ) );

const gql = `
query GetEvents {
    getEvents {
        eventId
        notes
        start
        type
        name
        ... on BeekeepingEvent {
            hives
            jobs
            goal
            link
        }
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
}
`;
interface EventCardProps {
  rowType : RowType;
  index : number;
}

export function EventCard ( { rowType, index } : EventCardProps )
{
  const t = useTranslations( "Home" );
  const url = process?.env?.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL : "";
  const fetcher = ( query : string ) => request( { url, document:query, requestHeaders:{ "Authorization":"x" } } );
  const { data, error, isLoading } = useSWR( gql, fetcher ) as {data : {getEvents : Event[]}, error : Error | undefined, isLoading : boolean};
  const selectedTab = useSelectedTabStore( ( state ) => state.selectedTab );
  const { classes } = useStyles();
  const [ opened, { open, close } ] = useDisclosure( false );
  const mdOrLargerScreen = useMediaQuery( "(min-width:768px)" );
  const happeningNow = rowType === "TODAY";
  const selectEvent = useEventsStore( ( state ) => state.selectEvent );

  const openModal = ( ) : void => {
    open();
  };
  if( isLoading ) return <Skeleton/>;
  if( error ) return <div><Error message={error.message}/></div>;
  const event = getEvent( data.getEvents, rowType, index, selectedTab === "past" );
  if( event === null || event === undefined ) return ( <></> );
  const { name, roles = [], jobs = [], hives = [], location = "", type, start, eventId } = event;
  // extract  the full name of the user who is a facilitator, jockey, and scribe
  const facilitator = roles.find( ( role ) => role.roleName === "Facilitator" );
  const jockey = roles.find( ( role ) => role.roleName === "Jockey" );
  const scribe = roles.find( ( role ) => role.roleName === "Scribe" );
  let categoryText, titleText;
  const startFormatted = new Date( start ).toLocaleString( getCookie( "NEXT_LOCALE" ) as string, {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: true
  } );
  switch ( event.type ) {
  case "BEEKEEPING":
    titleText = startFormatted;
    categoryText = `${jobs.join( ", " )} - ${hives.length > 0 ? hives.join( ", " ) : name}`;
    break;
  case "MEETING":
    //convert date to human readable format
    titleText = startFormatted;
    categoryText = `${t( location )}`;
  }
  if ( jobs.includes( "INSPECT" ) && selectedTab !== "past" ) {
    return (
      <Link href={`/event/${eventId}`}>
        <Paper
          onClick={() => selectEvent( event as Event )}
          shadow="xl"
          p="sm"
          radius="md"
          withBorder
          className="h-40 flex max-w-full flex-col justify-between items-start bg-cover bg-center bg-buzzhub-yellow hover:bg-buzzhub-yellow-dark"
        >
          <div>
            <Text className={classes.category}>{categoryText}</Text>
            <Title order={1} className="text-buzzhub-navy text-sm">
              {titleText}
            </Title>
          </div>
        </Paper>
      </Link>
    );
  }
  return (
    <>
      <EventNotesModal event={event} onClose={close} opened={opened}/>

      <Paper
        shadow="md"
        p="sm"
        radius="md"
        withBorder
        className="min-h-40 flex max-w-full flex-col cursor-pointer items-start bg-cover bg-center bg-buzzhub-yellow hover:bg-buzzhub-yellow-dark"
        onClick={() => { if( selectedTab === "past" ) openModal(); }}

      >

        <Text className={classes.category}>{categoryText}</Text>
        <Title order={1} className="text-buzzhub-navy text-sm">
          {titleText}
        </Title>
        {( !happeningNow && selectedTab === "upcoming" && type === "MEETING" ) || ( type === "MEETING" && happeningNow ) ? (
          <div className="grid grid-cols-6 grid-rows-3 gap-1 max-h-32 ">
            <IconSpeakerphone id="speakerphone" className="h-6 w-4 text-buzzhub-navy" />
            {mdOrLargerScreen && (
              <p className="col-span-2 text-buzzhub-navy">Facilitator: </p>
            )}
            <p className="truncate text-buzzhub-navy col-span-5 md:col-span-3">
              {facilitator?.user.fullName}
            </p>
            <IconTool id="tool" className="h-6 w-4 flex text-buzzhub-navy"/>
            {mdOrLargerScreen && <p className="col-span-2 text-buzzhub-navy">Jockey: </p>}
            <p className="truncate text-buzzhub-navy col-span-5 md:col-span-3">
              {jockey?.user.fullName}
            </p>
            <IconPencil id="pencil" className="h-6 w-4 text-buzzhub-navy"/>
            {mdOrLargerScreen && <p className="col-span-2 text-buzzhub-navy">Scribe: </p>}
            <p className="truncate text-buzzhub-navy col-span-5 md:col-span-3">
              {scribe?.user.fullName}
            </p>
          </div>
        ) : (
          type === "MEETING" && selectedTab === "past" && (
            <div className="h-32 truncate">
              <p className="whitespace-break-spaces text-buzzhub-navy ">
                {t( "seeNotes" )}
              </p>
            </div>

          )
        )}
      </Paper>
    </>

  );

}