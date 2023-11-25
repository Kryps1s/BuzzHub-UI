"use client";
import { Accordion } from "@mantine/core";
import TaskForm from "./task";
import { Agenda, Category } from "@/app/lib/types/types";

interface AgendaProps {
  agenda: Agenda
}

const MeetingAgenda = ( { agenda } : AgendaProps ) =>
{

  const accordionItems = ( Object.keys( agenda ) as Array<keyof typeof agenda> ).map( ( category ) => (
    <Accordion key={category}>
      <Accordion.Item id={`agenda-category-${category}`} value={`${category}`}>
        <Accordion.Control>{category}</Accordion.Control>
        <Accordion.Panel>
          <Accordion>
            {Object.keys( agenda[category] as Category ).map( ( subCategory, subIndex: number ) => (
              <Accordion.Item
                id={`agenda-subcategory-${category}-${subIndex}`}
                value={`${subIndex}`}
                key={`${subIndex}`}
              >
                <Accordion.Control>{subCategory}</Accordion.Control>
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
    <Accordion className='overflow-scroll max-h-96'>
      {accordionItems}
    </Accordion>
  );
};

export default MeetingAgenda;

