import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const ItemDetail = ({ show, handleClose, item }) => {
  const [logs, setLogs] = useState([]);
  const [newLog, setNewLog] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  const fetchLogs = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3000/logs/${item._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setLogs(response.data);
    } catch (error) {
      console.error('Failed to fetch logs:', error);
    }
  }, [item]);

  const fetchCurrentUser = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3000/auth/current', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCurrentUser(response.data);
    } catch (error) {
      console.error('Failed to fetch current user:', error);
    }
  }, []);

  useEffect(() => {
    if (item) {
      fetchLogs();
      fetchCurrentUser();
    }
  }, [item, fetchLogs, fetchCurrentUser]);

  const handleAddLog = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      console.error('Current user is not defined');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/logs',
        {
          itemId: item._id,
          content: newLog,
          createdBy: currentUser.name,  // Use the user's name
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setLogs([...logs, response.data]);
      setNewLog('');
    } catch (error) {
      console.error('Failed to add log:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="item-details">
          <h5>Nombre del Item: {item.itemName}</h5>
          <p>Fecha de Ingreso: {new Date(item.entryDate).toLocaleDateString()}</p>
          <p>Unidad de Medida: {item.measurementUnit}</p>
          <p>Precio por Unidad: {item.unitPrice}</p>
          <p>Cantidad: {item.quantity}</p>
          <p>Precio Total: {item.totalPrice}</p>
          <p>Nombre del Proyecto: {item.projectName}</p>
          <p>Total del Proyecto: {item.totalProjectAmount}</p>
        </div>
        <div className="logs-section">
          <h5>Bitácora</h5>
          {logs.map((log) => (
            <div key={log._id} className="log-entry">
              <p>{log.content}</p>
              <small>Creado por: {log.createdBy || 'Usuario desconocido'} el {new Date(log.createdAt).toLocaleString()}</small>
            </div>
          ))}
        </div>
        <Form onSubmit={handleAddLog}>
          <Form.Group controlId="formLogContent">
            <Form.Label>Nuevo Registro</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newLog}
              onChange={(e) => setNewLog(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Añadir Registro
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ItemDetail;
