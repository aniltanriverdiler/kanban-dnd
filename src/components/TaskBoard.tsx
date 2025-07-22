import React from "react";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import TaskColumn from "./TaskColumn";
import type { TaskProps } from "../types";

interface TaskBoardProps {
  tasks: TaskProps[];
  setTasks: React.Dispatch<React.SetStateAction<TaskProps[]>>;
}

// Defining statuses here
const statuses = ["To Do", "In Progress", "Done"];

function TaskBoard({ tasks, setTasks }: TaskBoardProps) {
  const onDragEnd = (result: DropResult) => {
    console.log("Drag Result:", result);
    const { destination, source, draggableId } = result;

    // Exit if there's no drop target or position hasn't changed
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Locate the dragged task
    const draggedTask = tasks.find((task) => task.id === draggableId);
    if (!draggedTask) {
      console.error(`The task could not be found: ${draggableId}`);
      return;
    }

    // Update task status
    const updatedTask: TaskProps = {
      ...draggedTask,
      status: destination.droppableId,
    };

    // Remove the task from the list
    const newTasks = tasks.filter((task) => task.id !== draggableId);

    // Filter tasks belonging to the destination column
    const destinationTasks = newTasks.filter(
      (task) => task.status === destination.droppableId
    );

    // At which index should the task be added?
    let insertAt = 0;
    if (destination.index === 0) {
      const firstTaskInDestination = newTasks.find(
        (task) => task.status === destination.droppableId
      );
      if (firstTaskInDestination) {
        insertAt = newTasks.indexOf(firstTaskInDestination);
      } else {
        insertAt = newTasks.length;
      }
    } else {
      const prevTaskInDestination = destinationTasks[destination.index - 1];
      if (prevTaskInDestination) {
        insertAt = newTasks.indexOf(prevTaskInDestination) + 1;
      } else {
        insertAt = newTasks.length;
      }
    }

    // Create the updated task list
    const finalTasks = [
      ...newTasks.slice(0, insertAt),
      updatedTask,
      ...newTasks.slice(insertAt),
    ];

    // Update tasks
    setTasks(finalTasks);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-8 md:gap-12 lg:gap-16 p-2 md:p-6">
          {statuses.map((status) => (
            <TaskColumn
              key={status}
              status={status}
              tasks={tasks.filter((task) => task.status === status)}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default TaskBoard;
