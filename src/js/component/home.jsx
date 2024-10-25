import React, { useState, useEffect } from "react";

const API_URL = "https://playground.4geeks.com/todo/user/alesanchezr";

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (response.status === 404) {
          return fetch(API_URL, {
            method: "POST",
            body: JSON.stringify([]),
            headers: { "Content-Type": "application/json" },
          }).then(() => []);
        }
        return response.json();
      })
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error al obtener tareas:", error));
  }, []);

  const updateTasks = (newTasks) => {
    fetch(API_URL, {
      method: "PUT",
      body: JSON.stringify(newTasks),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then(() => setTasks(newTasks))
      .catch((error) => console.error("Error al actualizar tareas:", error));
  };

  const addTask = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const newTasks = [...tasks, { label: inputValue, done: false }];
      updateTasks(newTasks);
      setInputValue("");
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    updateTasks(newTasks);
  };

  const clearTasks = () => {
    updateTasks([]);
  };

  return (
    <div className="todo-container">
      <h1>todos</h1>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={addTask}
      />
      <ul>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <li key={index}>
              {task.label}
              <button onClick={() => deleteTask(index)}>❌</button>
            </li>
          ))
        ) : (
          <li>No hay tareas, añade alguna.</li>
        )}
      </ul>
      <div>{tasks.length} item left</div>
      <button onClick={clearTasks}>Limpiar tareas</button>
    </div>
  );
}

export default App;