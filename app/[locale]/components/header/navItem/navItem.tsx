"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

interface props {
    icon: JSX.Element;
    title: string;
}

const NavItem = ( { icon, title } : props ) => {
  const [ isActive, setIsActive ] = useState( false );
  const t = useTranslations( "Home" );
  useEffect( () => {
    setIsActive( window?.location?.pathname === `/${title}` || ( window?.location?.pathname === "/" && title === "home" ) );
  }, [ title ] );
  const navPath = title === "home" ? "/" : `/${title}`;
  return (
    <div className={`flex justify-end ${isActive && "border-b-2 border-b-buzzhub-yellow"}`}>
      <Link className="hover:bg-gray-200 rounded-md p-2 " href={navPath}>
        {icon}
        <p id="navItemLabel" className="hidden md:block">{t( title )}</p>
      </Link>
    </div>

  );
};

export default NavItem;