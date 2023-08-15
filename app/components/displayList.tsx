import CopyButton from "./copyButton";
import { Event } from "../lib/types";

const formatDate = ( date: Date ) : string => {
  const options = {
    weekday: "long" as const,
    month: "long" as const,
    day: "numeric" as const,
    hour: "numeric" as const,
    hour12: true
  };
  return date.toLocaleDateString( "en-US", options );
};

const List = ( { upcomingMeetingDetails }:{ upcomingMeetingDetails:Event[] } ): JSX.Element => {
  if ( !upcomingMeetingDetails.length ) {
    return <div>There was a problem.</div>;
  }else if ( upcomingMeetingDetails.length === 1 ) {
    return <div>Only one event was found. </div>;
  }
  const [ next, following ]: Event[] = upcomingMeetingDetails;
  return (
    <section>
      <h2 className="font-bold">Upcoming Meeting: {formatDate( new Date( next?.start ) ) } <CopyButton upcomingMeetingDetails={upcomingMeetingDetails} /></h2>
      <h3 className="mb-3 font-bold">Location: {next?.location}</h3>
      <ul className="mb-6">
        {next?.roles.map ( ( item, index ) => (
          <li key={index}>
            <p>{item.roleName} : {item.user.username}</p>
          </li>
        ) )}
      </ul>
      <h2 className="font-bold">Following Meeting: {formatDate( new Date( following?.start ) ) }</h2>
      <h3 className="mb-3 font-bold">Location: {following?.location}</h3>
      <ul>
        {following?.roles.map( ( item, index ) => (
          <li key={index}>
            <p>{item.roleName} : {item.user.username}</p>
          </li>
        ) ) }
      </ul>
    </section>
  );
};

export default List;
