import { useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import { taskData } from "./data";
import type { TaskProps } from "./types";
import TaskBoard from "./components/TaskBoard";

const initialTasks: TaskProps[] = taskData.map((task) => ({
  ...task,
  id: nanoid(),
}));

function App() {
  const [tasks, setTasks] = useState<TaskProps[]>(initialTasks);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <TaskBoard tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
