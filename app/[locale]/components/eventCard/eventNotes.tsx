"use client";

import { Modal } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Event } from "../../../lib/types/types";
import { useTranslations } from "next-intl";

interface EventNotesModalProps {
    event: Event;
    onClose: () => void;
    opened: boolean;
}

const EventNotesModal = ( props: EventNotesModalProps ) => {
  const { event, onClose, opened } = props;
  const isMobile = useMediaQuery( "(max-width: 50em)" );
  const t = useTranslations( "Home" );

  return (
    <Modal opened={opened} onClose={onClose}
      fullScreen={isMobile}
      title={`Meeting Notes: ${event.name}`}>
      <section className="flex flex-row gap-2">
        <div className="flex flex-col gap-1">
          {
            event.notes ? event.notes.split( "\n" ).map( ( note, index ) => <p key={index}>{note}</p> ) : <p>{t( "noNotes" )}</p> }
        </div>
      </section>
    </Modal>
  );
};

export default EventNotesModal;