"use client";

import { toHeading } from "@/app/lib/services/agendaService";
import { TrelloMember, Agenda, Meeting } from "@/app/lib/types/types";
import { Button, CopyButton } from "@mantine/core";

const agendaToClipboard = ( { details, agenda } : Meeting<TrelloMember> ) : string =>`
Meeting: ${details.date} - ${details.location}

**GENERAL**
    *ROLES*
    ${details.roles.map( role => `• ${role.name}: ${role.value.fullName}` ).join( `
    ` )}

    *NEXT MEETING*
    •Date: ${details.date}
    •Location: ${details.location}
    •Roles:
        ${details.roles.map( role => `• ${role.name}: ${role.value.fullName}` ).join( `
        ` )}
    
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

CHECK OUT:`;

const MeetingCopyButton = ( meeting : Meeting<TrelloMember> ) => <article className="my-2 pt-2 mx-auto flex justify-center gap-2 border-t-2 w-4/5">
  <h1 className="text-xl">Agenda: </h1>
  <CopyButton value={agendaToClipboard( meeting )}>
    {( { copied, copy } ) => (
      <Button className={`${
        copied ? "bg-buzzhub-green-darkest" : "bg-buzzhub-green-dark"
      } hover:bg-buzzhub-green-darker`}
      onClick={copy}>
        {copied ? "Copied to clipboard!" : "Copy agenda"}
      </Button>
    )}
  </CopyButton>
</article>;

export default MeetingCopyButton;

