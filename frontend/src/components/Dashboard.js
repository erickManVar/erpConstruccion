import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Space } from 'antd';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px' }}>
      <h2>Dashboard</h2>
      <Space direction="vertical">
        <Button type="primary" onClick={() => navigate('/weekly-activities')}>Panel de Actividades Semanales</Button>
        <Button type="primary" onClick={() => navigate('/projects')}>Proyectos</Button>
        <Button type="primary" onClick={() => navigate('/inventory')}>Inventario</Button>
        <Button type="primary">Botón 4</Button>
        <Button type="primary">Botón 5</Button>
        <Button type="primary">Botón 6</Button>
        <Button type="primary">Botón 7</Button>
      </Space>
    </div>
  );
};

export default Dashboard;
