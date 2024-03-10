
export default function Layout ( { children }: { children: React.ReactNode } ) {
  return (
    <main className="w-screen h-screen bg-slate-400">{ children }</main>
  );
}
