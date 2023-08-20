"use client";
import { createStyles, Paper, Text, Title } from "@mantine/core";
import Link from "next/link";
import { Event } from "../lib/types";
import { useSelectedTabStore } from "../store/selectedTab";
import { useEventsStore } from "../store/events";
import { IconTool, IconSpeakerphone, IconPencil } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
const useStyles = createStyles( ( theme ) => ( {

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase"
  }
} ) );

interface EventCardProps {
  past?: Event ;
  upcoming?: Event ;
  happeningNow?: Event ;
}

export function EventCard ( { past, upcoming, happeningNow } : EventCardProps ) {

  const selectedTab = useSelectedTabStore( ( state ) => state.selectedTab );
  const event = happeningNow ? happeningNow : selectedTab === "upcoming" ? upcoming : past;
  const { classes } = useStyles();
  const mdOrLargerScreen = useMediaQuery( "(min-width:768px)" );
  const selectEvent = useEventsStore( ( state ) => state.selectEvent );
  if( event === null || event === undefined ) return ( <></> );
  const { name, roles = [], jobs = [], hives = [], location = "", type, start, eventId } = event;
  // extract  the full name of the user who is a facilitator, jockey, and scribe
  let facilitator, jockey, scribe;
  if( roles.length > 0 ) {
    facilitator = roles.find( ( role ) => role.roleName === "Facilitator" );
    jockey = roles.find( ( role ) => role.roleName === "Jockey" );
    scribe = roles.find( ( role ) => role.roleName === "Scribe" );
  }

  let categoryText, titleText;
  const startFormatted = new Date( start ).toLocaleString( "en-CA", {
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
    categoryText = `${location} MEETING`;
  }
  if ( jobs.includes( "INSPECT" ) ) {
    return (
      <Link href={`/event/${eventId}`}>
        <Paper
          onClick={() => selectEvent( event as Event )}
          shadow="xl"
          p="sm"
          radius="md"
          withBorder
          className="h-40 flex max-w-full flex-col justify-between items-start bg-cover bg-center bg-buzzhub-yellow"
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
  }else
    return (
      <Paper
        shadow="md"
        p="sm"
        radius="md"
        withBorder
        className="min-h-40 flex max-w-full flex-col items-start bg-cover bg-center bg-buzzhub-yellow"
      >
        <Text className={classes.category}>{categoryText}</Text>
        <Title order={1} className="text-buzzhub-navy text-sm">
          {titleText}
        </Title>

        {( !happeningNow && selectedTab === "upcoming" && type === "MEETING" ) || ( type === "MEETING" && happeningNow ) ? (
          <div className="grid grid-cols-6 grid-rows-3 gap-1 max-h-32 ">
            <IconSpeakerphone className="h-6 text-buzzhub-navy" size={"1rem"} />
            {mdOrLargerScreen && (
              <p className="col-span-2 text-buzzhub-navy">Facilitator: </p>
            )}
            <p className="truncate text-buzzhub-navy col-span-5 md:col-span-3">
              {facilitator?.user.fullName}
            </p>
            <IconTool className="h-6 text-buzzhub-navy" size={"1em"} />
            {mdOrLargerScreen && <p className="col-span-2 text-buzzhub-navy">Jockey: </p>}
            <p className="truncate text-buzzhub-navy col-span-5 md:col-span-3">
              {jockey?.user.fullName}
            </p>
            <IconPencil className="h-6 text-buzzhub-navy" size={"1em"} />
            {mdOrLargerScreen && <p className="col-span-2 text-buzzhub-navy">Scribe: </p>}
            <p className="truncate text-buzzhub-navy col-span-5 md:col-span-3">
              {scribe?.user.fullName}
            </p>
          </div>
        ) : (
          type === "MEETING" && selectedTab === "past" && (
            <div className="h-32 truncate">
              <p className="whitespace-break-spaces text-buzzhub-navy ">
          Click here to see meeting notes (🐝Coming Soon🐝)
              </p>
            </div>
          )
        )}
      </Paper>
    );

}