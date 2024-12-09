import React from "react";

const TaskList = ({ tasks, onDeleteTask, onToggleTaskCompletion }) => {
  return (
    <div>
      <h2>Lista de Tareas</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleTaskCompletion(task.id)}
            />
            <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
              {task.name}
            </span>
            <button onClick={() => onDeleteTask(task.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
