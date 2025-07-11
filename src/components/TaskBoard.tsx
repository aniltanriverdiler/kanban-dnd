import React from "react";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import TaskColumn from "./TaskColumn";
import type { TaskProps } from "../types";

interface TaskBoardProps {
  tasks: TaskProps[];
  setTasks: React.Dispatch<React.SetStateAction<TaskProps[]>>;
}

// Statüleri burada tanımlıyoruz
const statuses = ["To Do", "In Progress", "Done"];

function TaskBoard({ tasks, setTasks }: TaskBoardProps) {
  const onDragEnd = (result: DropResult) => {
    console.log("Drag Result:", result);
    const { destination, source, draggableId } = result;

    // Eğer bırakılacak hedef yoksa ya da konum değişmemişse çık
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Taşınan görevi bul
    const draggedTask = tasks.find((task) => task.id === draggableId);
    if (!draggedTask) {
      console.error(`Görev bulunamadı: ${draggableId}`);
      return;
    }

    // Görev statüsünü güncelle
    const updatedTask: TaskProps = {
      ...draggedTask,
      status: destination.droppableId,
    };

    // Görevi listeden çıkar
    const newTasks = tasks.filter((task) => task.id !== draggableId);

    // Hedef kolondaki görevleri filtrele
    const destinationTasks = newTasks.filter(
      (task) => task.status === destination.droppableId
    );

    // Görev hangi index'e eklenecek?
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

    // Güncellenmiş görev listesini oluştur
    const finalTasks = [
      ...newTasks.slice(0, insertAt),
      updatedTask,
      ...newTasks.slice(insertAt),
    ];

    // Görevleri güncelle
    setTasks(finalTasks);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-10 p-6">
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
