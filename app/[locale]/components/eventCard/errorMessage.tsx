"use client";
import { useTranslations } from "next-intl";
interface ErrorProps {
    message : string;
}
const Error = ( { message } : ErrorProps ) => {
  const t = useTranslations( "Misc" );
  return (
    <div className="w-full sm:w-7/8 2xl:w-3/4 mx-auto">
      <h1 className="text-2xl text-center">{t( "error" )}</h1>
      <p className="text-center">{t( "errorOccurred" )}</p>
      <p className="text-center truncate">{message}</p>
    </div>
  );};

export default Error;