import { TrelloMember } from "@/app/lib/types/types";
import React from "react";

interface MeetingDetailsProps {
  details : {
    date: string;
    roles: { name: string; value: TrelloMember }[];
  }
}

const MeetingDetails: React.FC<MeetingDetailsProps> = ( { details } : MeetingDetailsProps ) => {
  const { date, roles } = details;
  return(
    <div className="flex flex-col align-middle justify-center">
      <h1 className="mx-auto">Next Meeting: {date}</h1>
      <div>
        <ul>
          {roles.map( ( role ) => (
            <li key={role.value.id}>{role.name} : {role.value.fullName}</li>
          ) )}
        </ul>
      </div>
    </div>
  );
};

export default MeetingDetails;
