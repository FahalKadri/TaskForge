import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/tasks/")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.log(err));
  }, []);

  // PAGE SCROLL PROGRESS BAR
  useEffect(() => {
    const handleScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = window.scrollY;
      const progress = scrollable > 0 ? (scrolled / scrollable) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ADD TASK
  const handleAddTask = () => {
    if (!title.trim()) return;
    fetch("http://127.0.0.1:8000/api/tasks/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, completed: false }),
    })
      .then((res) => res.json())
      .then((newTask) => {
        setTasks((prev) => [...prev, newTask]);
        setTitle("");
        setIsModalOpen(false);
      })
      .catch((err) => console.log(err));
  };

  // DELETE TASK
  const handleDeleteTask = (id) => {
    fetch(`http://127.0.0.1:8000/api/tasks/${id}/`, {
      method: "DELETE",
    })
      .then(() => setTasks((prev) => prev.filter((t) => t.id !== id)))
      .catch((err) => console.log(err));
  };

  // TOGGLE COMPLETION
  const handleToggleComplete = (id, completed) => {
    fetch(`http://127.0.0.1:8000/api/tasks/${id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    })
      .then((res) => res.json())
      .then((updated) =>
        setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)))
      )
      .catch((err) => console.log(err));
  };

  // PROGRESS CALC
  const completedTasks = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;
  const taskProgressPercent = totalTasks
    ? (completedTasks / totalTasks) * 100
    : 0;

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-500 overflow-x-hidden ${
        darkMode
          ? "bg-gradient-to-br from-[#0b0f14] to-[#111827] text-white"
          : "bg-gradient-to-br from-gray-50 to-gray-200 text-gray-900"
      }`}
    >
      {/* NAVBAR */}
      <header className="sticky top-0 z-40">
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onNewTaskClick={() => setIsModalOpen(true)}
        />
        {/* THIN SCROLL BAR */}
        <div
          className={`h-1 ${
            darkMode ? "bg-indigo-500" : "bg-indigo-600"
          } transition-all duration-150`}
          style={{ width: `${scrollProgress}%` }}
        />
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-10 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-2 tracking-wide mt-10">TaskForge ⚙️</h1>
        <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} mb-8`}>
          Forge your productivity, one task at a time.
        </p>

        <div
          className={`w-full max-w-md rounded-2xl p-6 shadow-lg border transition-all duration-300 mb-32
            ${darkMode ? "bg-slate-900/70 border-slate-800" : "bg-white border-gray-300"}`}
        >
          {/* ============================
              ADD TASK BUTTON INSIDE CARD
              ============================ */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all
                ${
                  darkMode
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-900/40"
                    : "bg-indigo-500 hover:bg-indigo-400 text-white shadow-md shadow-indigo-200/60"
                }`}
            >
              + Add Task
            </button>
          </div>

          {totalTasks === 0 ? (
            <div className="text-center py-16">
              <p
                className={`${
                  darkMode ? "text-gray-400" : "text-gray-600"
                } text-lg`}
              >
                You’re all caught up! ✨
              </p>
              <p className="text-sm mt-1 text-indigo-400">
                Add a new task to get started 🧠
              </p>
            </div>
          ) : (
            <>
              {/* TASK LIST */}
              <ul className="space-y-3">
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    className={`flex justify-between items-center px-4 py-3 rounded-lg transition ${
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

              {/* PROGRESS BAR */}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span
                    className={`text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Progress
                  </span>
                  <span className="text-sm font-medium">
                    {completedTasks}/{totalTasks}
                  </span>
                </div>

                <div
                  className={`${
                    darkMode ? "bg-slate-700" : "bg-gray-300"
                  } h-2 rounded-full overflow-hidden`}
                >
                  <div
                    className="h-full bg-indigo-500 transition-all duration-500"
                    style={{ width: `${taskProgressPercent}%` }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <Footer darkMode={darkMode} />

      {/* ADD TASK MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div
            className={`p-6 rounded-2xl w-[90%] max-w-md shadow-lg border ${
              darkMode
                ? "bg-[#0d1117] text-white border-slate-800"
                : "bg-white text-gray-900 border-gray-200"
            }`}
          >
            <h2 className="text-xl font-semibold mb-4">Add a New Task</h2>

            <input
              type="text"
              placeholder="Enter task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg mb-4 outline-none transition ${
                darkMode
                  ? "bg-slate-800 text-white placeholder-blue-400 focus:ring-2 focus:ring-indigo-500"
                  : "bg-gray-100 text-gray-900 placeholder-blue-500 border border-gray-300 focus:ring-2 focus:ring-indigo-400"
              }`}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className={`px-4 py-2 rounded-lg transition ${
                  darkMode
                    ? "bg-slate-700 hover:bg-slate-600 text-gray-200"
                    : "bg-gray-200 hover:bg-blue-300 text-gray-800"
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
