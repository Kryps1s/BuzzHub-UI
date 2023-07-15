import Head from "next/head";
import { HeaderTabs } from "../components/header";
const siteTitle = "Buzzhub";

export default function Layout ( { children }: { children: React.ReactNode } ) {
  return (
    <div className="w-screen h-screen bg-slate-500">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{ siteTitle }</title>
        <meta name="og:title" content={ siteTitle } />
      </Head>
      {/* Rest of the code */}
      <HeaderTabs user={ { name: "Petrie", image: "" } } tabs={ [ "home", "calendar", "meeting", "collective" ] }></HeaderTabs>
      <main className="h-1/10 sm:h-4/5 2xl:h-full">{ children }</main>
    </div>
  );
}
