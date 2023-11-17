import React from "react";
import { Task } from "@/app/lib/types/types";

interface TaskProps {
    task: Task
}

const TaskForm: React.FC<TaskProps> = ( { task } ) => (
  <div>
    <h1>Task</h1>
    <p>Task ID: {task.eventId}</p>
    {/* Add more task details here */}
    <p>Task Name: {task.name}</p>
    <p>Task Start: {task.start}</p>
  </div>
);

export default TaskForm;
