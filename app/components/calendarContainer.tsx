"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CalendarEvent } from "@/app/lib/types/types";
import { useState } from "react";
import listPlugin from "@fullcalendar/list";
import useEventsStore from "../store/events";

const CalendarContainer = ( { events }:{ events: CalendarEvent[] } ): React.JSX.Element => {
  const getAspectRatio = () => {
    if ( typeof window !== "undefined" ) {
      if ( window.innerWidth < 640 ) {
        return 0.5;
      } else if ( window.innerWidth < 1024 ) {
        return 1;
      } else if ( window.innerWidth > 2222 ) {
        return 2;
      }
      else {
        return 1.5;
      }
    }
    return 1.5;
  };
  const [ aspectRatio, setAspectRatio ] = useState ( getAspectRatio() );

  if ( typeof window !== "undefined" ) {
    window.addEventListener( "resize", () => {
      setAspectRatio( getAspectRatio() );
    } );
  }
  return (
    <div className="w-full sm:w-7/8 2xl:w-3/4 mx-auto">
      <FullCalendar
        plugins={ [ dayGridPlugin, interactionPlugin, listPlugin ] }
        events={ events }
        editable={ false }
        headerToolbar={ { end: "dayGridMonth listMonth" } }
        aspectRatio={ aspectRatio }
        eventClick={ ( info ) => {
          if ( info.event.url ) {
            useEventsStore.getState().selectEvent( info.event.extendedProps.event );
          }
        } }
      />
    </div>
  );
};
export default CalendarContainer;