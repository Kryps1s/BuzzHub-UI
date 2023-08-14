import { EventCard } from "./eventCard";
import { EventCard as IEventCard } from "../lib/types";
import Link from "next/link";

interface EventRowProps {
    events: IEventCard[] | {past: IEventCard[], upcoming: IEventCard[]};
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
        <EventCard happeningNow={event} />
      </div>
    ) )
    :
    Array.from( { length: 3 }, ( _, index ) => (
      <div className={`h-38 ${contentColSpan}`} key={events.past[index].eventId}>
        <EventCard past={events.past[index]} upcoming={events.upcoming[index]} />
      </div>
    ) );
  return (
    <div className="w-full max-w-6xl mx-auto grid px-2 xl:px-36 grid-cols-3 gap-4 p-0 xl:p-8">
      <span className={`h-12 text-3xl truncate font-bold ${titleColSpan}`}>{title}</span>
      {seeAllLink && <span className="h-12 text-end">{seeAllLink}</span>}
      {upcomingRows}
    </div>
  );
};

export default EventRow;