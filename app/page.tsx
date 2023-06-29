
import Layout from './components/layout';
import DisplayList from './components/displayList';
import {  NextPage } from 'next';
import { Event, EventType } from './lib/types';
import { use } from 'react';
const ONE_DAY = 86400;

interface PageProps {
  upcomingMeetingDetails: Event[];
}

const Page : NextPage<PageProps> = () => {
  const upcomingMeetingDetails = use(getData()) ;
  return (
    <Layout>
      { <DisplayList upcomingMeetingDetails={upcomingMeetingDetails}/> }
    </Layout>
  );
}

const getData = async ()  => {
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
    if(process.env.API_URL && process.env.API_KEY) 
    {
      const res = await fetch(process.env.API_URL, {
      next: {revalidate: ONE_DAY},
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': process.env.API_KEY,
      },
      body: JSON.stringify({
        query: GetUpcomingMeetings,
        variables: {
          limit: 2,
          type: EventType.MEETING,
        },
      }),
    })
    const json = await res.json();
    return json.data.getAllEvents;
    }else
    {
      console.log("API_URL and API_KEY not set");
      return {};
    }
  }

export default Page  

