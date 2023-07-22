import Layout from "./layouts/homeLayout";
import { NextPage, Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Buzzhub",
  icons: "/favicon.ico"
};

const Page: NextPage = () => (
  <Layout>
    <p>Welcome home!</p>
  </Layout>
);

export default Page;
