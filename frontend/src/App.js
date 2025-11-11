import React, { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/tasks/")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  return (
    <div style={{ padding: "30px", fontFamily: "Poppins, sans-serif" }}>
      <h1>🧩 TaskForge</h1>
      <h3>Your Tasks</h3>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.title}</strong> —{" "}
              {task.completed ? "✅ Done" : "❌ Pending"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
