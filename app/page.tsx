import Layout from "./layouts/headerContent";
import { NextPage, Metadata } from "next";
import React from "react";
import { EventCard } from "./lib/types";
import EventContextBar from "./components/eventContextBar";
import EventRow from "./components/eventRow";

export const metadata: Metadata = {
  title: "BuzzHub",
  icons: "/favicon.ico"
};

const demoCard: EventCard = {
  "type": "BEEKEEPING",
  "eventId": "w8u8BQCL",
  "image": "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
  "jobs": [
    "TREAT",
    "HARVEST"
  ],
  "name": "test"
} ;
const demoCard2: EventCard = {
  "type": "BEEKEEPING",
  "eventId": "w8u8BQCL",
  "image": "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
  "jobs": [
    "NUC",
    "HARVEST"
  ],
  "name": "test2"
} ;
const events = [ demoCard, demoCard2, demoCard ];

const Page: NextPage = () => (
  <Layout>
    <div className="w-full flex flex-col align-middle justify-center">
      <EventRow events={events} title="Happening Now" />
      <EventContextBar />
      <EventRow events={events} title="Beekeeping (Examples - Work in Progress!)" seeAll={true} />
      <EventRow events={events} title="Collective (Examples - Work in Progress!)" seeAll={true}/>
    </div>

  </Layout>
);

export default Page;
