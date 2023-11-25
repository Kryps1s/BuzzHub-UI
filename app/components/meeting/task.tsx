import React from "react";
import { Task } from "@/app/lib/types/types";
import { IconBrandTrello, IconDotsVertical } from "@tabler/icons-react";
import { Badge } from "@mantine/core";

interface TaskProps {
    task: Task
}

function formatDate ( dateString : string ) : string {
  return dateString ? new Date( dateString ).toLocaleString( "en-CA", {
    weekday: "short",
    month: "long",
    day: "numeric"
  } ) : "";
}


const TaskForm: React.FC<TaskProps> = ( { task } ) => (
  <div className="grid grid-cols-4">
    <div>
      <p>{task.start ? formatDate( task.start ) : ""}</p>
      <p>Task Name: {task.name}</p>
    </div>

    <p>Participants: {task.participants }</p>
    <div className="flex my-auto flex-col sm:flex-row">
      { task.labels.map( ( label ) => (
        <Badge
          className="my-1 sm:my-0"
          key={ label }
          color={ label }
          style={ { marginRight: 5 } }
        >{label}</Badge>
      ) ) }
    </div>

    <div className="flex my-auto flex-col sm:flex-row">
      <a href={`https://trello.com/c/${task.eventId}`} target="_blank"><IconBrandTrello /></a>
      <IconDotsVertical />
    </div>
  </div>
);

export default TaskForm;
