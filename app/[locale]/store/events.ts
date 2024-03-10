import { create } from "zustand";
import { Event } from "../../lib/types/types";
import { persist, createJSONStorage } from "zustand/middleware";

interface EventsStore {
    events: Event[];
    selectedEvent?: Event;
    setEvents: ( events: Event[] ) => void;
    selectEvent: ( event: Event ) => void;
}

const useEventsStore = create<EventsStore>()( persist(
  ( set ) => ( {
    selectedEvent: undefined,
    events: [],
    setEvents: ( events: Event[] ) => set( { events } ),
    selectEvent: ( event: Event ) => set( { selectedEvent: event } )
  } ),
  {
    name: "events",
    storage: createJSONStorage( () => sessionStorage ) } )
);

export default useEventsStore;