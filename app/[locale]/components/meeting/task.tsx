"use client";
import React from "react";
import { Task } from "@/app/lib/types/types";
import { IconBrandTrello, IconDotsVertical } from "@tabler/icons-react";
import { Badge } from "@mantine/core";
import { useFormatter } from "next-intl";
interface TaskProps {
    task: Task
}


const TaskForm: React.FC<TaskProps> = ( { task } ) => {
  const formatter = useFormatter();
  function formatDate ( dateString : string ) : string {
    
    return dateString ? formatter.dateTime(new Date(dateString), {
      weekday: "short",
      month: "long",
      day: "numeric"
    }) : "";
  }
  
  return (
    <div className="grid grid-cols-12 w-full">
      <div className="col-span-12 sm:col-span-4 my-auto">
        <p>{task.start ? formatDate( task.start ) : ""}</p>
        <p className="  ">{task.name}</p>
      </div>
      <div className="flex col-span-4 my-auto flex-col md:flex-row">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {
            task.participants.map( ( participant, index ) => {
              if ( index > 3 ) {
                return null;
              }
              return (
                <div key={index} className="flex flex-col mx-1 break-words">
                  {index === 3 ? <p className="whitespace-nowrap">{`+${task.participants.length-3} more...`}</p> :
                    <p className="truncate">{participant}{index + 1 < task.participants.length ? ", " : ""}</p>
                  }
                </div>
              );
            } )
          }
        </div>
      </div>
      <div className="flex col-span-3 my-auto flex-col sm:flex-row">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          { task.labels.map( ( label ) => (
            <Badge
              className="my-1 sm:my-1"
              key={ label }
              color={ label }
              style={ { marginRight: 5 } }
            >{label.includes(":") ? label.split(":")[1] : label}</Badge>
          ) ) }
        </div>
      </div>
      <div className="flex col-span-1 my-auto flex-col sm:flex-row">
        <a href={`https://trello.com/c/${task.eventId}`} target="_blank"><IconBrandTrello /></a>
        <IconDotsVertical />
      </div>
    </div>
  );
}

export default TaskForm;
