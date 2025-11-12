import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/tasks/")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.log(err));
  }, []);

  const handleAddTask = () => {
    if (!title.trim()) return;
    fetch("http://127.0.0.1:8000/api/tasks/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, completed: false }),
    })
      .then((res) => res.json())
      .then((newTask) => {
        setTasks([...tasks, newTask]);
        setTitle("");
        setIsModalOpen(false);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteTask = (id) => {
    fetch(`http://127.0.0.1:8000/api/tasks/${id}/`, {
      method: "DELETE",
    })
      .then(() => setTasks(tasks.filter((t) => t.id !== id)))
      .catch((err) => console.log(err));
  };

  const handleToggleComplete = (id, completed) => {
    fetch(`http://127.0.0.1:8000/api/tasks/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    })
      .then((res) => res.json())
      .then((updated) =>
        setTasks(tasks.map((t) => (t.id === id ? updated : t)))
      )
      .catch((err) => console.log(err));
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-[#0b0f14] to-[#111827] text-white"
          : "bg-gradient-to-br from-gray-50 to-gray-200 text-gray-900"
      }`}
    >
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onNewTaskClick={() => setIsModalOpen(true)}
      />

      <div className="flex flex-col items-center p-6">
        <h1 className="text-4xl font-bold mb-2 tracking-wide mt-10">TaskForge ⚙️</h1>
        <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} mb-8`}>
          Forge your productivity, one task at a time.
        </p>

        <div
          className={`w-full max-w-md rounded-2xl p-6 shadow-lg border transition-all duration-300 
            ${
              darkMode
                ? "bg-slate-900/70 border-slate-800"
                : "bg-white border-gray-300"
            }`}
        >
          {tasks.length === 0 ? (
            <p
              className={`text-center ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              No tasks yet 🚀
            </p>
          ) : (
            <ul className="space-y-3">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className={`flex justify-between items-center px-4 py-3 rounded-lg transition 
                    ${
                      darkMode
                        ? "bg-slate-800 hover:bg-slate-700"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() =>
                        handleToggleComplete(task.id, task.completed)
                      }
                      className="w-4 h-4 accent-indigo-500"
                    />
                    <span
                      className={`${
                        task.completed
                          ? "line-through opacity-60"
                          : "opacity-100"
                      }`}
                    >
                      {task.title}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-red-400 hover:text-red-300 transition text-xl"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div
            className={`p-6 rounded-2xl w-[90%] max-w-md transform transition-all duration-300 scale-100 shadow-lg
            ${
              darkMode
                ? "bg-[#0d1117] text-white border border-slate-800"
                : "bg-white text-gray-900 border border-gray-200"
            }`}
          >
            <h2 className="text-xl font-semibold mb-4">Add a New Task</h2>
            <input
              type="text"
              placeholder="Enter task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg mb-4 outline-none transition
                ${
                  darkMode
                    ? "bg-slate-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
                    : "bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 focus:ring-2 focus:ring-indigo-400"
                }`}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className={`px-4 py-2 rounded-lg transition ${
                  darkMode
                    ? "bg-slate-700 hover:bg-slate-600 text-gray-200"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
