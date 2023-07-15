"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CalendarEvent } from "@/app/lib/types";
import React, { useState } from "react";
import listPlugin from "@fullcalendar/list";

const CalendarContainer = ( { events }:{ events: CalendarEvent[] } ): React.JSX.Element => {
  const getAspectRatio = () => {
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
  };
  const [ aspectRatio, setAspectRatio ] = useState ( getAspectRatio() );

  //change aspect ratio based for large medium and small screens
  window.addEventListener( "resize", () => {
    setAspectRatio( getAspectRatio() );
  } );
  return (
    <div className="w-full sm:w-7/8 2xl:w-3/4 mx-auto">
      <FullCalendar
        plugins={ [ dayGridPlugin, interactionPlugin, listPlugin ] }
        events={ events }
        editable={ true }
        headerToolbar={ { end: "dayGridMonth listMonth" } }
        aspectRatio={ aspectRatio }
      />
    </div>
  );
};
export default CalendarContainer;