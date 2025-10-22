import React, { useState, useMemo } from "react";
import Button from "./Button";
import useLocalStorage from "../hooks/useLocalStorage";

const useLocalStorageTasks = () => {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const addTask = (text) => {
    if (!text || !text.trim()) return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ]);
  };
  const toggleTask = (id) =>
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));
  return { tasks, addTask, toggleTask, deleteTask };
};

export default function TaskManager() {
  const { tasks, addTask, toggleTask, deleteTask } = useLocalStorageTasks();
  const [newTaskText, setNewTaskText] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredTasks = useMemo(() => {
    if (filter === "active") return tasks.filter((t) => !t.completed);
    if (filter === "completed") return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  const remaining = tasks.filter((t) => !t.completed).length;

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(newTaskText);
    setNewTaskText("");
  };

  return (
    <section
      id="tasks"
      className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 fade-up"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Task Manager</h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {remaining} remaining
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button type="submit" variant="primary">
            Add
          </Button>
        </div>
      </form>

      <div className="flex gap-2 mb-4">
        <Button
          variant={filter === "all" ? "primary" : "secondary"}
          size="sm"
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button
          variant={filter === "active" ? "primary" : "secondary"}
          size="sm"
          onClick={() => setFilter("active")}
        >
          Active
        </Button>
        <Button
          variant={filter === "completed" ? "primary" : "secondary"}
          size="sm"
          onClick={() => setFilter("completed")}
        >
          Completed
        </Button>
        <div className="ml-auto text-sm text-gray-500 dark:text-gray-400">
          Total: {tasks.length}
        </div>
      </div>

      <ul className="space-y-2">
        {filteredTasks.length === 0 ? (
          <li className="text-gray-500 dark:text-gray-400 text-center py-6">
            No tasks yet
          </li>
        ) : (
          filteredTasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-700"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <div>
                  <div
                    className={`${
                      task.completed
                        ? "line-through text-gray-500 dark:text-gray-400"
                        : ""
                    }`}
                  >
                    {task.text}
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(task.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => toggleTask(task.id)}
                >
                  {task.completed ? "Undo" : "Done"}
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </Button>
              </div>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
