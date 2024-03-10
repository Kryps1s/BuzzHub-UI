import "@/app/globals.css";
import { NextIntlClientProvider } from "next-intl";

const RootLayout = async ( { children, params }: { children: React.ReactNode, params: {locale:string} } ) => {
  let dictionary;

  try {
    dictionary = ( await import( `@/app/[locale]/messages/${params.locale}.json` ) ).default;
  }catch( e ) {
    console.error( ( e as Error ).toString() );
  }

  return (
    <NextIntlClientProvider
      // Provide default locale and runtime locale data
      // to every component in your app
      messages={dictionary}
      formats={{}}
      locale={params.locale}
    >
      <html lang={params.locale}>
        <body className="h-screen w-screen overflow-hidden">{children}</body>
      </html>
    </NextIntlClientProvider>
  );
};

export default RootLayout;