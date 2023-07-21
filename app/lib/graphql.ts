const GRAPHQL = async ( body: BodyInit ) => {
  if( !process.env.NEXT_PUBLIC_API_URL || !process.env.NEXT_PUBLIC_API_KEY ) {
    throw new Error( "API_URL or API_KEY not set" );
  }else{
    const res = await fetch( process.env.NEXT_PUBLIC_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": process.env.NEXT_PUBLIC_API_KEY
      },
      body
    } ).then( res => res.json() ) ;
      //check for graphQl errors
    if ( res.errors ) {
      throw new Error( res.errors[0].message );
    }
    return res.data ;
  }
};

export default GRAPHQL;

