import React, { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetch all tasks
  const fetchTasks = () => {
    fetch("http://127.0.0.1:8000/api/tasks/")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add new task
  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    fetch("http://127.0.0.1:8000/api/tasks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTask }),
    })
      .then((response) => response.json())
      .then(() => {
        setNewTask("");
        fetchTasks(); // Refresh list
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  // Delete task
  const deleteTask = (id) => {
    fetch(`http://127.0.0.1:8000/api/tasks/${id}/`, {
      method: "DELETE",
    })
      .then(() => fetchTasks())
      .catch((error) => console.error("Error deleting task:", error));
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Poppins, sans-serif" }}>
      <h1>🧩 TaskForge</h1>

      {/* Add task form */}
      <form onSubmit={addTask} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task..."
          style={{
            padding: "10px",
            fontSize: "16px",
            width: "250px",
            marginRight: "10px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 15px",
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </form>

      {/* Task list */}
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{
                background: "#f5f5f5",
                padding: "10px 15px",
                borderRadius: "8px",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>
                <strong>{task.title}</strong> —{" "}
                {task.completed ? "✅ Done" : "❌ Pending"}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                style={{
                  background: "#f44336",
                  color: "white",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
