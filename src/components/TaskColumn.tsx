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
      <div className="w-80 bg-gradient-to-b from-gray-100 via-blue-50 to-green-100 dark:from-gray-800 dark:via-blue-900 dark:to-gray-900 rounded-2xl shadow-lg p-4 border border-blue-200 dark:border-blue-950 transition-colors duration-300">
        <h3 className="text-xl font-semibold text-center mb-4 text-blue-900 dark:text-blue-100 tracking-wide uppercase letter-spacing-wider">
          {status}
        </h3>
        <Droppable droppableId={status}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`space-y-4 min-h-[100px] rounded-xl transition-colors duration-200 border border-transparent ${
                snapshot.isDraggingOver ? "bg-blue-100/60 border-blue-400 dark:bg-blue-950/60 dark:border-blue-700" : "bg-gray-50/60 dark:bg-gray-900/60"
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
