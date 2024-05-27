import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import WeeklyActivities from './components/WeeklyActivities';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/weekly-activities" element={<WeeklyActivities />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
