import { getCookie, hasCookie, setCookie } from "cookies-next";

export async function POST ( req: Request ) {
  const body = await req.text();
  if( !process.env.NEXT_PUBLIC_API_URL || !process.env.NEXT_PUBLIC_API_KEY ) {
    throw new Error( "API_URL or API_KEY not set" );
  }else{

    const headers = new Headers();
    let auth = "x";
    headers.append( "Content-Type", "application/json" );
    if( hasCookie( "access_token" ) )
    {
      const authToken = getCookie( "access_token" );
      if( typeof authToken === "string" ) {
        auth = authToken;
      }
    }
    headers.append( "Authorization", auth );

    const res = await fetch( process.env.NEXT_PUBLIC_API_URL, {
      cache: req.cache ? req.cache : "no-store",
      method: "POST",
      headers,
      body
    } ).then( res => res.json() ) ;
    //check for graphQl errors
    if ( res.errors ) {
      const genericError = "You are not authorized to make this call.";
      if( res.errors[0].message === genericError ) {
        switch( getCookie( "NEXT_LOCALE" ) ) {
        case "en":
          throw new Error( "Please log in to complete this action" );
        case "fr":
          throw new Error( "Veuillez vous connecter pour effectuer cette action" );
        }

      }
      throw new Error( res.errors[0].message );
    }
    if( res.data?.login ) {
      //set cookie
      setCookie( "access_token", res.data.login.access_token );
      setCookie( "name", "admin" );
    }
    return res.data ;
  }
}