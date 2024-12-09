import React, { useState } from "react";

const AddTask = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState("");

  const handleAddTask = () => {
    if (taskName.trim() !== "") {
      onAddTask(taskName);
      setTaskName(""); // Limpiar el campo de texto
    }
  };

  return (
    <div>
      <h2>Agregar Tarea</h2>
      <input
        type="text"
        placeholder="Nueva tarea"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button onClick={handleAddTask}>Agregar</button>
    </div>
  );
};

export default AddTask;
