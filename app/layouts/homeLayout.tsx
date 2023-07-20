import { HeaderTabs } from "../components/header";

export default function Layout ( { children }: { children: React.ReactNode } ) {
  return (
    <div className="w-screen h-screen bg-slate-500">
      <HeaderTabs user={ { name: "Guest", image: "" } } tabs={ [ "home", "calendar", "meeting", "collective" ] }></HeaderTabs>
      <main className="h-1/10 sm:h-4/5 2xl:h-full">{ children }</main>
    </div>
  );
}
