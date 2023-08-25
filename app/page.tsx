import Layout from "./layouts/headerContent";
import { NextPage, Metadata } from "next";
import { RowType } from "./lib/types/types";
import EventContextBar from "./components/eventContextBar";
import EventRow from "./components/eventRow";

export const metadata: Metadata = {
  title: "BuzzHub",
  icons: "/favicon.ico"
};

const Page: NextPage = () => (
  <Layout>
    <div className="w-full flex flex-col align-middle justify-center mb-10">
      <EventRow type={"TODAY" as RowType} />
      <EventContextBar />
      <EventRow type={"BEEKEEPING" as RowType} seeAll={true} />
      <EventRow type={"COLLECTIVE" as RowType} seeAll={true}/>
    </div>

  </Layout>
);
export default Page;

