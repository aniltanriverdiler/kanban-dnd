import type { TaskProps } from "../types";
import { Draggable } from "@hello-pangea/dnd";

interface TaskCardProps {
  task: TaskProps;
  index: number;
}

function TaskCard({ task, index }: TaskCardProps) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        /* Card Section */
        <div
          className="max-w-sm mb-1 bg-gradient-to-br from-gray-100 via-blue-50 to-green-100 dark:from-gray-800 dark:via-blue-950 dark:to-green-950 border border-blue-200 dark:border-blue-900 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-200 cursor-pointer group"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="p-5">
            <h5 className="mb-2 text-xl font-bold tracking-wide text-blue-900 group-hover:text-green-700 dark:text-blue-100 dark:group-hover:text-green-200 transition-colors duration-200">
              {task.title}
            </h5>
            <p className="mb-2 font-medium text-gray-700 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-gray-100 transition-colors duration-200">
              {task.description}
            </p>
            <p className="mb-1 font-semibold text-green-700 text-sm dark:text-green-300">
              Assigned: <span className="text-blue-800 dark:text-blue-200">{task.assignee}</span>
            </p>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;
