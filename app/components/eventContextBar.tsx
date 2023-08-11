"use client";
import { Tabs } from "@mantine/core";

const EventContextBar = () => (
  <Tabs className="flex justify-center" defaultValue="future">
    <Tabs.List>
      <Tabs.Tab value="future">UPCOMING</Tabs.Tab>
      <Tabs.Tab value="past">PAST EVENTS</Tabs.Tab>
    </Tabs.List>
  </Tabs>
);

export default EventContextBar;