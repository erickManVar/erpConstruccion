import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={() => navigate('/weekly-activities')}>Panel de Actividades Semanales</button>
      <button onClick={() => navigate('/projects')}>Proyectos</button>
      <button onClick={() => navigate('/inventory')}>Inventario</button>
      <button>Botón 4</button>
      <button>Botón 5</button>
      <button>Botón 6</button>
      <button>Botón 7</button>
    </div>
  );
};

export default Dashboard;
