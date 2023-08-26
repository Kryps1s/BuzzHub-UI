import {
  IconHome,
  IconTie,
  IconCalendar,
  IconUsersGroup
} from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import LoginButton from "../login/loginButton";
import NavItem from "./navItem/navItem";

interface HeaderTabsProps {
  tabs: string[];
}

export function Header ( { tabs }: HeaderTabsProps ) {

  // const mdOrLargerScreen = useMediaQuery( "(min-width:768px)" );

  const items = tabs.map( ( tab:string ) => {
    let icon;
    switch ( tab ) {
    case "home":
      icon = <IconHome className="mx-auto" size={20} />;
      break;
    case "calendar":
      icon = <IconCalendar className="mx-auto" size={20} />;
      break;
    case "meeting":
      icon = <IconTie className="mx-auto" size={20} />;
      break;
    case "collective":
      icon = <IconUsersGroup className="mx-auto" size={20} />;
    }
    return (
      <Link key={tab} href={tab === "home" ? "/" : `/${tab}`}>
        {/* <Tabs.Tab value={tab} id={tab} key={tab} className="flex flex-col items-center m-2 hover:bg-gray-200 border-none">
          {icon}
          <p>{tab}</p>
        </Tabs.Tab> */}
      </Link>
    );
  }
  );

  return (

    <div className="w-screen flex h-36 justify-evenly content-evenly pt-1 md:pt-3 md:mb-2 bg-buzzhub-grey-light border-b border-b-buzzhub-grey-light">

      <Link className="h-full w-1/4 relative" href="/">
        <Image
          src="/images/Buzzhub_Logo.svg"
          alt="Logo"
          fill={true}
        />
      </Link>

      <nav className="flex items-end justify-between space-around border-none w-1/3 max-w-sm pb-1">
        <NavItem icon={<IconHome className="mx-auto" size={20} />} title="home" />
        <NavItem icon={<IconCalendar className="mx-auto" size={20} />} title="calendar" />
        <NavItem icon={<IconTie className="mx-auto" size={20} />} title="meeting" />
        <NavItem icon={<IconUsersGroup className="mx-auto" size={20} />} title="collective" />
      </nav>

      <LoginButton/>

    </div>
  );
}