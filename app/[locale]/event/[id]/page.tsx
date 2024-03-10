import Layout from "@/app/[locale]/layouts/headerContent";
import { NextPage, Metadata } from "next";
import JobForm from "@/app/[locale]/components/jobForm";
import { use } from "react";
import { POST } from "@/app/[locale]/api/graphql/route";
import ErrorPage from "@/app/[locale]/components/error";
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
        <ErrorPage error={trelloMembers.error}/>
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