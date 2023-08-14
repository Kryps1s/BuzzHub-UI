"use client";
import { Tabs } from "@mantine/core";
import { useSelectedTabStore } from "../store/selectedTab";

const EventContextBar = () => {
  const selectedTab = useSelectedTabStore( ( state ) => state.selectedTab );
  const setSelectedTab = useSelectedTabStore( ( state ) => state.setSelectedTab );

  return (
    <Tabs className="flex justify-center" defaultValue={selectedTab} >
      <Tabs.List>
        <Tabs.Tab value="upcoming" onClick={() => setSelectedTab( "upcoming" )} >UPCOMING</Tabs.Tab>
        <Tabs.Tab value="past" onClick={() => setSelectedTab( "past" )} >PAST EVENTS</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
};

export default EventContextBar;