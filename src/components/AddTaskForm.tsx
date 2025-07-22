import React, { useState } from "react";
import type { TaskProps } from "../types";
import { nanoid } from "nanoid";

interface AddTaskFormProps {
  addTask: (task: TaskProps) => void;
}

function AddTaskForm({ addTask }: AddTaskFormProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [status, setStatus] = useState<"To Do" | "In Progress" | "Done">(
    "To Do"
  );
  const [error, setError] = useState<string | null>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !assignee) {
      setError("All fields must be filled in.");
      return;
    }

    const newTask: TaskProps = {
      id: nanoid(),
      title,
      description,
      status,
      assignee,
    };

    addTask(newTask);
    setTitle("");
    setDescription("");
    setAssignee("");
    setStatus("To Do");
    setError(null);
    toggleModal();
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleModal}
        className="block text-gray-900 bg-gradient-to-r from-gray-200 via-blue-100 to-green-200 hover:from-green-200 hover:to-blue-200 focus:ring-4 focus:outline-none focus:ring-blue-200 font-semibold rounded-xl text-base px-6 py-2.5 text-center shadow-md transition-all duration-200 border border-gray-300 dark:text-white dark:bg-gradient-to-r dark:from-gray-800 dark:via-blue-950 dark:to-green-900 dark:hover:from-green-900 dark:hover:to-blue-900 dark:focus:ring-blue-900 dark:border-blue-900"
        type="button"
      >
        Add New Task
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative p-4 w-full max-w-md">
            <div className="relative bg-gradient-to-b from-gray-100 via-blue-50 to-green-100 dark:from-gray-900 dark:via-blue-950 dark:to-green-950 rounded-2xl shadow-xl border border-blue-200 dark:border-blue-950 transition-colors duration-300">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-200 rounded-t dark:border-gray-600">
                <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 tracking-wide">
                  Add New Task
                </h3>
                <button
                  onClick={toggleModal}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-blue-100 hover:text-green-700 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center transition-colors duration-200 dark:hover:bg-blue-950 dark:hover:text-green-300"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 14 14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                    />
                  </svg>
                  <span className="sr-only">Add</span>
                </button>
              </div>
              <div className="flex ps-5 pt-5">
                {error && (
                  <div className="text-white font-semibold">{error}</div>
                )}
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit} className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-semibold text-blue-900 dark:text-blue-100"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter Task Title..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="bg-gray-50 border border-blue-200 text-blue-900 text-base rounded-lg block w-full p-2.5 focus:ring-green-700 focus:border-green-700 transition-all duration-200 dark:bg-gray-900 dark:border-blue-900 dark:text-blue-100"
                    />
                  </div>

                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-semibold text-blue-900 dark:text-blue-100"
                    >
                      Description
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter description..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="bg-gray-50 border border-blue-200 text-blue-900 text-base rounded-lg block w-full p-2.5 focus:ring-green-700 focus:border-green-700 transition-all duration-200 dark:bg-gray-900 dark:border-blue-900 dark:text-blue-100"
                    />
                  </div>

                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-semibold text-blue-900 dark:text-blue-100"
                    >
                      Assigned Person
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter Assigned Person..."
                      value={assignee}
                      onChange={(e) => setAssignee(e.target.value)}
                      className="bg-gray-50 border border-blue-200 text-blue-900 text-base rounded-lg block w-full p-2.5 focus:ring-green-700 focus:border-green-700 transition-all duration-200 dark:bg-gray-900 dark:border-blue-900 dark:text-blue-100"
                    />
                  </div>

                  <div className="col-span-2">
                    <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-semibold text-blue-900 dark:text-blue-100"
                    >
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={status}
                      onChange={(e) =>
                        setStatus(
                          e.target.value as "To Do" | "In Progress" | "Done"
                        )
                      }
                      className="bg-gray-50 border border-blue-200 text-blue-900 text-base rounded-lg focus:ring-green-700 focus:border-green-700 block w-full p-2.5 transition-all duration-200 dark:bg-gray-900 dark:border-blue-900 dark:text-blue-100"
                    >
                      <option value="" disabled>
                        Select category
                      </option>
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Done">Done</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="text-gray-900 bg-gradient-to-r from-gray-200 via-blue-100 to-green-200 hover:from-green-200 hover:to-blue-200 focus:ring-4 focus:outline-none focus:ring-green-200 font-semibold rounded-xl text-base px-6 py-2.5 inline-flex items-center shadow-md transition-all duration-200 border border-gray-300 dark:text-white dark:bg-gradient-to-r dark:from-gray-800 dark:via-blue-950 dark:to-green-900 dark:hover:from-green-900 dark:hover:to-blue-900 dark:focus:ring-green-900 dark:border-blue-900"
                  >
                    <svg
                      className="me-1 -ms-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddTaskForm;
