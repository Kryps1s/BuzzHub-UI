import { EventCard } from "./eventCard/eventCard";
import { RowType } from "../lib/types/types";
import Link from "next/link";

interface EventRowProps {
    // events: Event[] | {past: Event[], upcoming: Event[]};
    seeAll?: boolean;
    type: RowType
}

const EventRow = ( { type, seeAll } : EventRowProps ) => {
  let title;
  let contentColSpan : string;
  switch ( type ) {
  case "TODAY":
    title = "Happening today";
    contentColSpan = "col-span-auto";
    break;
  case "BEEKEEPING":
    title = "Beekeeping";
    contentColSpan = "col-span-1";

    break;
  case "COLLECTIVE":
    title = "Collective";
    contentColSpan = "col-span-1";

    break;
  }
  // const isHappeningNow = Array.isArray( events );
  const titleColSpan = seeAll ? "col-span-2" : "col-span-3";
  const seeAllLink = seeAll ? <Link href="/"><p className="text-xs">See all</p></Link> : null;
  const row = Array.from( { length: 3 }, ( _, index ) => (
    <div className={` ${contentColSpan}`} key={index}>
      <EventCard rowType={type} index={index}/>
    </div>
  ) )
   ;
  return (
    <div className="w-full max-w-6xl mx-auto grid px-2  grid-cols-3 gap-4 p-0 xl:p-8 mb-8">
      <span className={`h-10 text-3xl truncate font-bold ${titleColSpan}`}>{title}</span>
      {seeAllLink && <span className="h-10 text-end">{seeAllLink}</span>}
      {row}
    </div>
  );
};

export default EventRow;