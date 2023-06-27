'use client'
import { useState, useEffect } from 'react';
import CopyButton from "./copyButton";
import {devApiKey} from "../aws-credentials.json"; //to be removed, just temporary so that I can push to repo without exposing my api key
import {Amplify, API, graphqlOperation} from "aws-amplify";

let aws_config = {
    'aws_appsync_graphqlEndpoint': 'https://sjurhsyi25arhdfhgszi2s4tem.appsync-api.ca-central-1.amazonaws.com/graphql',
    'aws_appsync_region': 'us-east-1ca-central-1',
    'aws_appsync_authenticationType': 'API_KEY',
    'aws_appsync_apiKey': devApiKey
}
Amplify.configure(aws_config)


interface Role {
	roleName: String
	userName: String
}
enum EventType {
	MEETING,
	COLLECTIVE,
	BEEKEEPING
}
interface Event {
	eventId?: String
	type: EventType
	start: String
	end: String
	roles: [Role]
    location: String
}

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
const formatDate = (date : Object) => {
    const options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      hour12: true,
    };
  
    return date.toLocaleDateString('en-US', options);
  };

const list = () => {
    const [upcomingMeetingDetails, setUpcomingMeetingDetails] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchData = async () => {
          try {
            console.log("Fetching data...");
    
            const response = await API.graphql(graphqlOperation(GetUpcomingMeetings, {
              limit: 2,
              type: EventType.MEETING,
            }));
    
            const upcomingMeetings = response.data.getAllEvents;
            console.log(upcomingMeetings);
            setUpcomingMeetingDetails(upcomingMeetings);
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
      
      let next :Event = upcomingMeetingDetails[0];
      let following :Event = upcomingMeetingDetails[1];
    
      return (
        <section>
          <h2 className='font-bold'>Upcoming Meeting: {formatDate(new Date(next.start))} <CopyButton upcomingMeetingDetails={upcomingMeetingDetails}/></h2>
          <h3 className='mb-3 font-bold'>Location: {next?.location}</h3>
          <ul className='mb-6'>
            {next?.roles.map((item, index) => (
              <li key={index}>
                <p>{item.roleName} : {item.userName}</p>
              </li>
            ))}
          </ul>
          <h2 className='font-bold'>Following Meeting: {formatDate(new Date(following.start))}</h2>
          <h3 className='mb-3 font-bold'>Location: {following?.location}</h3>
          <ul>
            {following?.roles.map((item, index) => (
              <li key={index}>
                <p>{item.roleName} : {item.userName}</p>
              </li>
            ))}
          </ul>
        </section>
      );
}

export default list;