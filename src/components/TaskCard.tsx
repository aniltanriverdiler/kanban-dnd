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
          className="max-w-sm mb-1 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <a href="#">
            <img
              className="rounded-t-lg"
              src="/docs/images/blog/image-1.jpg"
              alt=""
            />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {task.title}
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {task.description}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Atanan: {task.assignee}
            </p>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;
