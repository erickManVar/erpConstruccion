import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import WeeklyActivities from './components/WeeklyActivities';
import Projects from './components/Projects';
import Inventory from './components/Inventory';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/weekly-activities" element={<WeeklyActivities />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/inventory" element={<Inventory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
