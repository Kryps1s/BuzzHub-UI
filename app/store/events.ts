import { create } from "zustand";
import { Event } from "../lib/types";

interface EventsStore {
    events: Event[];
    selectedEvent?: Event;
    setEvents: ( events: Event[] ) => void;
    selectEvent: ( event: Event ) => void;
}

export const useEventsStore = create<EventsStore>( ( set ) => ( {
  selectedEvent: undefined,
  events: [],
  setEvents: ( events: Event[] ) => set( { events } ),
  selectEvent: ( event: Event ) => set( { selectedEvent: event } )
} ) );