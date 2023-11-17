import React from "react";

interface MeetingDetailsProps {
    meetingId: string;
}

const MeetingDetails: React.FC<MeetingDetailsProps> = ( { meetingId } ) => (
  <div>
    <h1>Meeting Details</h1>
    <p>Meeting ID: {meetingId}</p>
    {/* Add more meeting details here */}
  </div>
);

export default MeetingDetails;
