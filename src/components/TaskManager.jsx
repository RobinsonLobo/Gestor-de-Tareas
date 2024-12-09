import React, { useState, useEffect } from "react";

function TaskManager() {
  // Cargar las tareas y el estado de los checkboxes desde localStorage
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      return parsedTasks.tasks || []; // Si hay tareas guardadas, las carga
    }
    return []; // Si no hay tareas guardadas, inicializa con un array vacío
  });

  const [newTask, setNewTask] = useState("");
  const [taskStatuses, setTaskStatuses] = useState(() => {
    const savedStatuses = localStorage.getItem("tasks");
    if (savedStatuses) {
      const parsedStatuses = JSON.parse(savedStatuses);
      return parsedStatuses.statuses || {}; // Si hay estados guardados, los carga
    }
    return {}; // Si no hay estados guardados, inicializa con un objeto vacío
  });

  // Guardar tareas y estados en localStorage cada vez que cambian
  useEffect(() => {
    const tasksData = {
      tasks: tasks,
      statuses: taskStatuses,
    };
    localStorage.setItem("tasks", JSON.stringify(tasksData));
  }, [tasks, taskStatuses]); // Se guarda cada vez que tasks o taskStatuses cambian

  const handleAddTask = () => {
    if (newTask.trim() === "") return; // Validación: evitar agregar tareas vacías
    setTasks([...tasks, newTask]); // Agregar nueva tarea
    setTaskStatuses({ ...taskStatuses, [newTask]: false }); // Inicializa el estado como "no marcado"
    setNewTask(""); // Limpiar el input
  };

  const handleCheckboxChange = (task) => {
    setTaskStatuses({
      ...taskStatuses,
      [task]: !taskStatuses[task], // Invierte el estado del checkbox
    });
  };

  const handleDeleteTask = (task) => {
    if (taskStatuses[task]) {
      const confirmDelete = window.confirm(
        `¿Estás seguro de que deseas eliminar la tarea "${task}"?`
      );
      if (confirmDelete) {
        setTasks(tasks.filter((t) => t !== task)); // Elimina la tarea de la lista
        const { [task]: _, ...newStatuses } = taskStatuses;
        setTaskStatuses(newStatuses); // Elimina el estado de la tarea
      }
    } else {
      alert("Marca la casilla antes de eliminar la tarea.");
    }
  };

  return (
    <div className="contenedor-principal">
      {/* Sección para agregar tareas */}
      <div className="agregar-tarea">
        <h2>Agregar Tarea</h2>
        <input
          type="text"
          placeholder="Nueva tarea"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Agregar</button>
      </div>

      {/* Lista de tareas */}
      <div className="lista-tareas">
        <h2>Lista de Tareas</h2>
        <ul>
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <li
                key={index}
                className={taskStatuses[task] ? "completed" : ""}
                style={{
                  textDecoration: taskStatuses[task] ? "line-through" : "none",
                }}
              >
                <input
                  type="checkbox"
                  checked={taskStatuses[task] || false}
                  onChange={() => handleCheckboxChange(task)}
                />
                {task}
                <button onClick={() => handleDeleteTask(task)}>Eliminar</button>
              </li>
            ))
          ) : (
            <p>No hay tareas.</p> // Si no hay tareas, se muestra un mensaje
          )}
        </ul>
      </div>
    </div>
  );
}

export default TaskManager;
