"use client";
import { getCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import { Button, Loader } from "@mantine/core";
import { useEffect, useState } from "react";
// import Link from "next-intl/ link";
import { Link } from "@/navigation";
const TranslationSelector = ( ) => {
  const path = usePathname();
  const [ isHydrated, setIsHydrated ] = useState( false );

  const [ currentLocale, setCurrentLocale ] = useState( getCookie( "NEXT_LOCALE" ) );
  useEffect( () => {
    setIsHydrated( true );
    setCurrentLocale( getCookie( "NEXT_LOCALE" ) );
  }, [] );

  switch( isHydrated ? currentLocale : "lang" ) {
  case "fr":
    return (
      <Link className="my-auto" href={`/${path.slice( 3 )}`} locale="en">
        <Button className="flex mr-2 items-center w-2 bg-buzzhub-green-dark hover:bg-buzzhub-green-darker text-center justify-center align-middle my-auto center"> en </Button>
      </Link>
    );
  case "en":
    return (
      <Link className="my-auto" href={`/${path.slice( 3 )}`} locale="fr">
        <Button className="flex mr-2 items-center w-2 bg-buzzhub-green-dark hover:bg-buzzhub-green-darker text-center justify-center align-middle my-auto center"> fr </Button>
      </Link>
    );
  default:
    return <Loader className="my-auto" size={"xs"}/>;
  }
};

export default TranslationSelector;