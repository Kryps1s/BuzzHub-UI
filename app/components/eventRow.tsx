import React from "react";
import { ArticleCardImage } from "./eventCard";
import { EventCard } from "../lib/types";
import Link from "next/link";

interface EventRowProps {
    events: EventCard[] | {past: EventCard[], upcoming: EventCard[]};
    title: string;
    seeAll?: boolean;
}

const EventRow = ( { events, title, seeAll } : EventRowProps ) => {
  const isHappeningNow = Array.isArray( events );
  const titleColSpan = seeAll ? "col-span-2" : "col-span-3";
  const contentColSpan = isHappeningNow && events.length === 1 ? "col-span-3" : "col-span-1";
  const seeAllLink = seeAll ? <Link href="/"><p className="text-xs">See all</p></Link> : null;
  const upcomingRows = isHappeningNow
    ? events.map( ( event ) => (
      <div key={event.eventId} className={`h-38 ${contentColSpan}`}>
        <ArticleCardImage past={event} upcoming={null} />
      </div>
    ) )
    :
    Array.from( { length: 3 }, ( _, index ) => (
      <div className={`h-38 ${contentColSpan}`} key={events.past[index].eventId}>
        <ArticleCardImage past={events.past[index]} upcoming={events.upcoming[index]} />
      </div>
    ) );
  return (
    <div className="w-full xl:w-1/2 mx-auto grid px-2 xl:px-36 grid-cols-3 gap-4 p-0 xl:p-8">
      <span className={`h-12 text-3xl truncate font-bold ${titleColSpan}`}>{title}</span>
      {seeAllLink && <span className="h-12 text-end">{seeAllLink}</span>}
      {upcomingRows}
    </div>
  );
};

export default EventRow;