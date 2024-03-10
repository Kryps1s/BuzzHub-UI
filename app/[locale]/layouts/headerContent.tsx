import { Header } from "../components/header/header";

export default function Layout ( { children }: { children: React.ReactNode } ) {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <Header />
      <main className="h-4/5 overflow-y-scroll  overflow-x-hidden  scroll">{ children }</main>
    </div>
  );
}
