import React, { useEffect, useState } from "react";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from Django backend
  const fetchTasks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/tasks/");
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/tasks/${id}/`, {
        method: "DELETE",
      });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Tasks</h1>

      <div className="w-full max-w-2xl">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-200 p-5 flex justify-between items-center mb-4 border border-gray-100"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {task.title}
                </h3>
                <p className="text-sm text-gray-500">{task.description}</p>
              </div>
              <button
                onClick={() => handleDelete(task.id)}
                className="text-red-500 hover:text-red-700 transition text-xl"
              >
                ✕
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No tasks yet.</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
