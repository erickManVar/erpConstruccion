import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

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
      console.log('Fetched projects:', response.data);
      setProjects(response.data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/projects', formData);
      console.log('Created project:', response.data);
      fetchProjects();
      handleClose();
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    console.log('Projects state updated:', projects);
  }, [projects]);

  const columns = [
    { name: 'Name', selector: row => row.name, sortable: true },
    { name: 'Description', selector: row => row.description, sortable: true },
    { name: 'Start Date', selector: row => row.startDate, sortable: true },
    { name: 'End Date', selector: row => row.endDate, sortable: true },
  ];

  return (
    <div>
      <h1>Projects</h1>
      <Button variant="primary" onClick={handleShow}>
        Create Project
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter project name"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter project description"
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Create
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <DataTable
        title="Projects"
        columns={columns}
        data={projects}
        pagination
      />
    </div>
  );
};

export default Projects;
