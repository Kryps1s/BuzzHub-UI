"use client";
import { setCookie, getCookie } from "cookies-next";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@mantine/core";
const TranslationSelector = ( ) => {
  const path = usePathname();
  const router = useRouter();
  const currentLocale = getCookie( "NEXT_LOCALE" );
  return (
    currentLocale === "en" ?
      <Button
        className="flex mr-2 items-center w-2 bg-buzzhub-green-dark hover:bg-buzzhub-green-darker text-center justify-center align-middle my-auto center"
        onClick={()=> {
          setCookie( "NEXT_LOCALE", "fr" );

            router.replace(`/fr${path.slice(3)}`);
        }} > fr </Button>:
      <Button
        className="flex mr-2 items-center w-2 bg-buzzhub-green-dark hover:bg-buzzhub-green-darker text-center justify-center align-middle my-auto center"
        onClick={()=> {
          setCookie( "NEXT_LOCALE", "en" );
          router.replace(`/en${path.slice(3)}`);
        }
        }> en </Button>

  );
};
export default TranslationSelector;