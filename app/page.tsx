import Layout from "./layouts/homeLayout";
import { NextPage, Metadata } from "next";
import { ArticleCardImage } from "./components/eventCard";
import React from "react";

export const metadata: Metadata = {
  title: "Buzzhub",
  icons: "/favicon.ico"
};

type card = {
  image: string;
  name: string;
  eventId: string;
  type: string;
  jobs: string[];
}
const demoCard: card = {
  "type": "BEEKEEPING",
  "eventId": "w8u8BQCL",
  "image": "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
  "jobs": [
    "INSPECT",
    "HARVEST"
  ],
  "name": "test"
} ;
const demoCard2: card = {
  "type": "BEEKEEPING",
  "eventId": "w8u8BQCL",
  "image": "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
  "jobs": [
    "NUC",
    "HARVEST"
  ],
  "name": "test2"
} ;

const Page: NextPage = () => (
  <Layout>
    <div className="w-1/2 mx-auto">
      <ArticleCardImage id={demoCard.eventId} image={demoCard.image} title={demoCard.name} jobs={demoCard.jobs} />
      <ArticleCardImage id={demoCard2.eventId} image={demoCard2.image} title={demoCard2.name} jobs={demoCard2.jobs} />

    </div>
  </Layout>
);

export default Page;
