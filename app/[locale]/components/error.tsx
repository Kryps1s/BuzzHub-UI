"use client";
import React from "react";
import { useTranslations } from "next-intl";

const Error = ( { error }: { error: any } ) => { //eslint-disable-line
  const t = useTranslations( "Misc" );
  return (
    <div className="w-full sm:w-7/8 2xl:w-3/4 mx-auto">
      <h1 className="text-2xl text-center">{t( "error" )}</h1>
      <p className="text-center">{error}</p>
    </div>
  );
};

export default Error;
