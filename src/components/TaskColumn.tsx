import type { TaskProps } from "../types";
import TaskCard from "./TaskCard";
import { Droppable } from "@hello-pangea/dnd";

interface TaskColumnProps {
  status: string;
  tasks: TaskProps[];
}

function TaskColumn({ status, tasks }: TaskColumnProps) {
  return (
    <>
      <div className="w-80 bg-white rounded-lg shadow-md p-4">
        <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">
          {status}
        </h3>
        <Droppable droppableId={status}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`space-y-4 min-h-[100px] rounded-md transition-colors duration-200 ${
                snapshot.isDraggingOver ? "bg-gray-200" : "bg-gray-100"
              }`}
            >
              {tasks.map((task, index) => (
                <TaskCard key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </>
  );
}

export default TaskColumn;
