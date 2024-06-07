import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import axios from 'axios';
import ProjectsModal from './ProjectsModal';
import ProjectsTable from './ProjectsTable';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:3000/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:3000/projects', formData);
      fetchProjects();
      handleClose();
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  const handleEdit = (project) => {
    setFormData(project);
    setShow(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/projects/${id}`);
      fetchProjects();
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
      <h1>Projects</h1>
      <Button type="primary" onClick={handleShow}>Create Project</Button>
      <ProjectsModal
        open={show}
        handleClose={handleClose}
        formData={formData}
        handleInputChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
        handleSubmit={handleSubmit}
      />
      <ProjectsTable projects={projects} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default Projects;
