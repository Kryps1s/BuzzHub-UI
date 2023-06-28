'use client'
import { useState, useEffect } from 'react';
import CopyButton from './copyButton';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import { Event, EventType} from '../app/types';
const aws_config = {
  aws_appsync_graphqlEndpoint: process.env.NEXT_PUBLIC_API_URL,
  aws_appsync_region: 'ca-central-1',
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: process.env.NEXT_PUBLIC_API_KEY,
};
Amplify.configure(aws_config);



const GetUpcomingMeetings = `
  query GetUpcomingMeetings {
    getAllEvents(limit: 2, type: MEETING) {
      start
      location
      end
      type
      roles {
        roleName
        userName
      }
    }
  }
`;

const formatDate = (date: Date): string => {
  const options = {
    weekday: 'long' as const,
    month: 'long' as const,
    day: 'numeric' as const,
    hour: 'numeric' as const,
    hour12: true,
  };

  return date.toLocaleDateString('en-US', options);
};

const List = (): JSX.Element => {
  const [upcomingMeetingDetails, setUpcomingMeetingDetails] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data...');

        const response = await API.graphql(graphqlOperation(GetUpcomingMeetings, {
          limit: 2,
          type: EventType.MEETING,
        })) as {data: {getAllEvents: Event[]}; errors: any[]};

        const { getAllEvents } = response.data;
        console.log(getAllEvents);
        setUpcomingMeetingDetails(getAllEvents);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const next: Event = upcomingMeetingDetails[0];
  const following: Event = upcomingMeetingDetails[1];

  return (
    <section>
      <h2 className="font-bold">Upcoming Meeting: {formatDate(new Date(next.start))} <CopyButton upcomingMeetingDetails={upcomingMeetingDetails} /></h2>
      <h3 className="mb-3 font-bold">Location: {next?.location}</h3>
      <ul className="mb-6">
        {next?.roles.map((item, index) => (
          <li key={index}>
            <p>{item.roleName} : {item.userName}</p>
          </li>
        ))}
      </ul>
      <h2 className="font-bold">Following Meeting: {formatDate(new Date(following.start))}</h2>
      <h3 className="mb-3 font-bold">Location: {following?.location}</h3>
      <ul>
        {following?.roles.map((item, index) => (
          <li key={index}>
            <p>{item.roleName} : {item.userName}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default List;
