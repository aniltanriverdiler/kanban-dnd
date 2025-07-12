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
      setError("Tüm alanların doldurulması gerekmektedir.");
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
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Yeni Görev Ekle
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative p-4 w-full max-w-md">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-200 rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Yeni Görev Ekle
                </h3>
                <button
                  onClick={toggleModal}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                  <span className="sr-only">Ekle</span>
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
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Başlık
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Görev Başlığı Giriniz..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                    />
                  </div>

                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Açıklama
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Açıklama Giriniz..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                    />
                  </div>

                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Atanan Kişi
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Atanan Kişiyi Giriniz..."
                      value={assignee}
                      onChange={(e) => setAssignee(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                    />
                  </div>

                  <div className="col-span-2">
                    <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
