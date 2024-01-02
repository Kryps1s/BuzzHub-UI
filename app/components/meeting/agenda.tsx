"use client";
import { Accordion, Badge } from "@mantine/core";
import TaskForm from "./task";
import { Agenda, Category } from "@/app/lib/types/types";
import { toHeading } from "@/app/lib/services/agendaService";

interface AgendaProps {
  agenda: Agenda
}

const MeetingAgenda = ( { agenda } : AgendaProps ) =>
{

  const accordionItems = ( Object.keys( agenda ) as Array<keyof typeof agenda> ).map( ( category ) => (
    <Accordion multiple defaultValue={[ "BEEKEEPING", "COLLECTIVE" ]} key={category}>
      <Accordion.Item id={`agenda-category-${category}`} value={`${category}`}>
        <Accordion.Control>{category} <Badge>{
        //get length of all subcategories
          Object.keys( agenda[category] as Category ).reduce( ( acc, subCategory ) => acc + agenda[category][subCategory].length, 0 )
        }</Badge></Accordion.Control>
        <Accordion.Panel>
          <Accordion multiple>
            {Object.keys( agenda[category] as Category ).map( ( subCategory, subIndex: number ) => (
              <Accordion.Item
                id={`agenda-subcategory-${category}-${subIndex}`}
                value={`${subIndex}`}
                key={`${subIndex}`}
              >
                <Accordion.Control>{toHeading( subCategory )} <Badge>{agenda[category][subCategory].length}</Badge></Accordion.Control>
                <Accordion.Panel>
                  {agenda[category][subCategory].map( ( event, eventIndex: number ) => (
                    <Accordion.Item
                      id={`agenda-event-${category}-${subCategory}-${eventIndex}`}
                      value={`${eventIndex}`}
                      key={`${eventIndex}`}
                    >
                      <TaskForm task={event} />
                    </Accordion.Item>
                  ) )}
                </Accordion.Panel>
              </Accordion.Item>
            ) )}
          </Accordion>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>

  ) );

  return (

    <Accordion className='overflow-scroll'>
      {accordionItems}
    </Accordion>

  );
};

export default MeetingAgenda;

