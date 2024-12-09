import React from "react";
import TaskManager from "./components/TaskManager";
import './App.css';

function App() {
  return (
    <div className="App">

        {/* Barra de logotipo */}
      <div className="barra-superior">
        <img src="/Logotipo/Logo.png" alt="Logotipo" className="logo" />
      </div> 

      {/* Contenedor para el título */}
      <div className="titulo-contenedor">
        <h1>Gestor de Tareas</h1>
      </div>

      {/* Componente de TaskManager directamente */}
      <TaskManager />
    </div>
  );
}

export default App;
