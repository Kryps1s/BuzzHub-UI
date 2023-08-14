import { HeaderTabs } from "../components/header";

export default function Layout ( { children }: { children: React.ReactNode } ) {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <HeaderTabs tabs={ [ "home", "calendar", "meeting", "collective" ] }></HeaderTabs>
      <main className="h-4/5 overflow-y-scroll  overflow-x-hidden  scroll">{ children }</main>
    </div>
  );
}
