"use client";
import { Tabs } from "@mantine/core";
import { useSelectedTabStore } from "../store/selectedTab";
import { useTranslations } from "next-intl";

const EventContextBar = () => {
  const selectedTab = useSelectedTabStore( ( state ) => state.selectedTab );
  const setSelectedTab = useSelectedTabStore( ( state ) => state.setSelectedTab );
  const t = useTranslations( "Home" );

  return (
    <Tabs className="flex justify-center" defaultValue={selectedTab} >
      <Tabs.List>
        <Tabs.Tab value="upcoming" onClick={() => setSelectedTab( "upcoming" )} >{t( "UPCOMING" )}</Tabs.Tab>
        <Tabs.Tab value="past" onClick={() => setSelectedTab( "past" )} >{t( "PAST" )} </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
};

export default EventContextBar;