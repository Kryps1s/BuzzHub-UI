"use client";
import { useTranslations, useFormatter } from "next-intl";

import { toHeading } from "@/app/lib/services/agendaService";
import { TrelloMember, Agenda, Meeting } from "@/app/lib/types/types";
import { Button, CopyButton } from "@mantine/core";

const MeetingCopyButton = ( meeting : Meeting<TrelloMember> ) =>{
  const t = useTranslations( "Meeting" );
  const formatter = useFormatter();
  const agendaToClipboard = ( { details, agenda, next } : Meeting<TrelloMember> ) : string =>`
    Meeting: ${formatter.dateTime( details.date, {
    timeZone: "America/Montreal",
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: true
  } )} - ${details.location}
    
    **GENERAL**
        *ROLES*
        ${details.roles.map( role => `• ${role.name}: ${role.value.fullName}` ).join( `
        ` )}
    
        ${
  next ? `
        *NEXT MEETING*
        •Date: ${formatter.dateTime( next.date, {
    timeZone: "America/Montreal",
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: true
  } )}
        •Location: ${next.location}
        •Roles:
            ${next.roles.map( role => `• ${role.name}: ${role.value.fullName}` ).join( `
            ` )}    `
    :
    "*There is no next meeting scheduled.*"
}
        
        *RECURRING TASKS*
        •Attendance
            # people: 
    
        ${ details.isMonthly ? "•Monthly Check-in" : "•Check-in" }
    
        •Cleaning Checklist
            Is the basement clean?
    
            Is our fridge space clean?
    
    **WORKSHOP**
    •The next workshop is on :
    
    
    ${Object.keys( agenda ).map( ( category ) => {
    const categoryObject = agenda[category as keyof Agenda];
    return `**${category}**
    
    ${Object.keys( categoryObject ).map( ( subcategory ) => {
    const subcategoryObject = categoryObject[subcategory];
    return `*${toHeading( subcategory )}*
    
    ${subcategoryObject.map( ( task ) => `[${task.name}] (https://trello.com/c/${task.eventId}) ${task.participants.length > 0 ? ` - ${task.participants.join( ", " )}` : ""}
    ` ).join( `
    ` )}
    `;
  } ).join( `
    ` )}
    `;
  } ).join( `
    ` )}
    CHECK OUT`;
  return ( <article className="my-2 pt-2 mx-auto flex justify-center gap-2 border-t-2 w-4/5">
    <h1 className="text-xl">{t( "agenda" )}: </h1>
    <CopyButton value={agendaToClipboard( meeting )}>
      {( { copied, copy } ) => (
        <Button className={`${
          copied ? "bg-buzzhub-green-darkest" : "bg-buzzhub-green-dark"
        } hover:bg-buzzhub-green-darker`}
        onClick={copy}>
          {copied ? t( "copied" ) : t( "copy" )}
        </Button>
      )}
    </CopyButton>
  </article> );
};

export default MeetingCopyButton;

