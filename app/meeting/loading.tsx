"use client";
import { Loader } from "@mantine/core";
import Layout from "../layouts/headerContent";

export default function Loading () {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-buzzhub-grey-dark">Loading Agenda...</h1>
        <Loader id="loader" className="mx-auto my-auto" color="#545778" />
      </div>
    </Layout>
  );
}
