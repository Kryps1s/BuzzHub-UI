"use client";
import { CopyIcon } from "@radix-ui/react-icons";
import { Event, Role } from "@/app/lib/types";

const copyButton = ( { upcomingMeetingDetails }:{ upcomingMeetingDetails: Event[] } ) => {
  const formatRoles = ( roles : Role[] ) => roles.map ( ( role : Role ) => `• ${role.user.fullName}: ${role.user.fullName}` ).join( "\n      " );
  const formatDate = ( date : Date ) => {
    const options = {
      weekday: "long" as const,
      month: "long" as const,
      year: "numeric" as const,
      day: "numeric" as const
    };

    return date.toLocaleDateString( "en-US", options );
  };
  const copyMeetingDetailsToClipboard = () => {
    const meetingDetails = `
  MEETING ${formatDate( new Date( upcomingMeetingDetails[0].start ) ) }
  
  **General**
  • Location: ${upcomingMeetingDetails[0].location}
  • Meeting Roles
      ${formatRoles( upcomingMeetingDetails[0].roles ) }
  
  • Next meeting
    • Date: ${formatDate( new Date( upcomingMeetingDetails[1].start ) ) }
    • Location: ${upcomingMeetingDetails[1].location}
    • Meeting Roles
      ${formatRoles( upcomingMeetingDetails[1].roles ) }
  
  **Recurring (15-30m)**
    • Attendance
       # people: 
    • Check-in
    
    • Monthly Check-in
       Next date for monthly check-in: 2023-07-07 (Vendredi, SR)
  
    • Basement check
      Is the basement clean? 
    `;

    const tempElement = document.createElement( "div" );
    tempElement.innerHTML = meetingDetails;

    const plainText = tempElement.textContent || tempElement.innerText;

    const textarea = document.createElement( "textarea" );
    textarea.value = plainText;

    document.body.appendChild( textarea );
    textarea.select();
    document.execCommand( "copy" );
    document.body.removeChild( textarea );
  };

  return (
    <button onClick={ copyMeetingDetailsToClipboard }>
      <CopyIcon/>
    </button>
  );
};

export default copyButton;