import React from "react";
import { ArticleCardImage } from "./eventCard";
import { EventCard } from "../lib/types";
import Link from "next/link";

interface EventRowProps {
    events: EventCard[];
    title: string;
    seeAll?: boolean;
}

const EventRow = ( { events, title, seeAll } : EventRowProps ) => {
  const upcomingRows = events.map( ( event ) => (
    <div key={event.eventId} className='h-38'>
      <ArticleCardImage eventId={event.eventId} image={event.image} type={event.type} name={event.name} jobs={event.jobs} />
    </div>

  ) );
  const titleColSpan = seeAll ? "col-span-2" : "col-span-3";
  const seeAllLink = seeAll ? <Link href="/"><p className="text-xs">See all</p></Link> : null;

  return (
    <div className="w-full xl:w-1/2 mx-auto grid px-2 xl:px-36 grid-cols-3 gap-4 p-0 xl:p-8">
      <span className={`h-12 text-3xl truncate font-bold ${titleColSpan}`}>{title}</span>
      {seeAllLink && <span className="h-12 text-end">{seeAllLink}</span>}
      {upcomingRows}
    </div>
  );
};

export default EventRow;