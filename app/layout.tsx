import "./globals.css";

export default function RootLayout ( { children }: { children: React.ReactNode } ) {
  return (
    <html lang="en">
      <body className="h-screen w-screen overflow-hidden">{children}</body>
    </html>
  );
}
