import { useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import { taskData } from "./data";
import type { TaskProps } from "./types";
import TaskBoard from "./components/TaskBoard";
import AddTaskForm from "./components/AddTaskForm";

const initialTasks: TaskProps[] = taskData.map((task) => ({
  ...task,
  id: nanoid(),
}));

function App() {
  const [tasks, setTasks] = useState<TaskProps[]>(initialTasks);

  const addTask = (task: TaskProps) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  // Dark mode toggle handler
  const handleThemeToggle = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-green-100 dark:from-gray-900 dark:via-blue-950 dark:to-green-900 transition-colors duration-300 flex flex-col">
      {/* Header & Theme Toggle */}
      <header className="w-full flex items-center justify-between px-4 md:px-10 py-4 border-b border-gray-200 dark:border-blue-950 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <span className="inline-block w-8 h-8 rounded-full bg-gradient-to-br from-blue-900 via-blue-700 to-green-900 mr-2"></span>
          <h1 className="text-xl md:text-2xl font-bold tracking-wide text-gray-900 dark:text-blue-100 uppercase select-none">Kanban Board</h1>
        </div>
        <button
          onClick={handleThemeToggle}
          className="px-4 py-2 rounded-xl font-semibold shadow-md bg-gradient-to-r from-gray-200 via-blue-100 to-green-200 text-gray-800 hover:from-green-200 hover:to-blue-200 dark:from-gray-800 dark:via-blue-950 dark:to-green-900 dark:text-blue-100 dark:hover:from-green-900 dark:hover:to-blue-900 transition-all duration-200 border border-gray-300 dark:border-blue-900"
          aria-label="Toggle dark mode"
        >
          <span className="inline-block align-middle mr-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </span>
          <span className="align-middle hidden sm:inline">Toggle Theme</span>
        </button>
      </header>
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start px-2 md:px-8 py-6 md:py-10 w-full max-w-7xl mx-auto">
        <div className="w-full flex justify-center mb-4">
          <div className="max-w-2xl w-full flex justify-center">
            <AddTaskForm addTask={addTask} />
          </div>
        </div>
        <div className="w-full flex-1 flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 items-stretch justify-center">
          <TaskBoard tasks={tasks} setTasks={setTasks} />
        </div>
      </main>
    </div>
  );
}

export default App;
