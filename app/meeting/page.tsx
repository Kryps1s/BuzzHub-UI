import { NextPage } from "next";
import Layout from "../layouts/headerContent";
import type { Metadata } from "next";
import MeetingDetails from "../components/meeting/details";
import MeetingAgenda from "../components/meeting/agenda";

export const metadata: Metadata = {
  title: "BuzzHub - Meeting",
  icons: "/favicon.ico"
};

const Page: NextPage = () => (

  <Layout>
    <MeetingDetails meetingId="123"/>
    <MeetingAgenda/>
  </Layout>

);

export default Page;
