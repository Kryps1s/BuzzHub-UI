import Layout from "@/app/layouts/headerContent";
import { NextPage, Metadata } from "next";
import JobForm from "@/app/components/jobForm";
import { use } from "react";
import { POST } from "../../api/graphql/route";

export const metadata: Metadata = {
  title: "BuzzHub - Inspection Report",
  icons: "/favicon.ico"
};

interface Context {
  params: {
    id: string;
  };
}
const Page: NextPage = ( context ) => {
  const ctx = context as Context;
  const trelloMembers = use ( getData() );
  if( trelloMembers.error ) {
    return (
      <Layout>
        <div className="w-full sm:w-7/8 2xl:w-3/4 mx-auto">
          <h1 className="text-2xl text-center">Error</h1>
          <p className="text-center">{trelloMembers.error}</p>
        </div>
      </Layout>
    );
  }

  return(
    <Layout>
      <JobForm id={ctx.params.id} trelloMembers={trelloMembers.data} jobs={[ "INSPECT" ]} />
    </Layout>
  );
};

const getData = async () => {
  const req = new Request( "http://buzzhub.com", {
    method: "POST",
    cache: "force-cache",
    body:JSON.stringify( {
      query: `
       query GetTrelloMembers {
         getTrelloMembers {
             id
             fullName
             username
         }
     }`,
      variables: {}
    } )
  } );
  try{
    const res = await POST( req );
    return { data: res.getTrelloMembers };
  }
  catch( err : unknown ) {
    if( err instanceof Error ) {
      return { error: err.message };
    }
    else{
      console.error( err );
      return { error: "Unknown error" };
    }
  }
};

export default Page;