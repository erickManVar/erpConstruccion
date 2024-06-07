import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';

const Inventory = () => {
  const { projectId } = useParams();
  const [inventory, setInventory] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    itemCode: '',
    category: '',
    storage: '',
    entryDate: '',
    unit: '',
    unitPrice: 0,
    totalPrice: 0,
    observations: '',
    projectId: projectId,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchInventory = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/inventory/project/${projectId}`);
      setInventory(response.data);
    } catch (error) {
      console.error('Failed to fetch inventory:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/inventory', formData);
      fetchInventory();
      handleClose();
    } catch (error) {
      console.error('Failed to create inventory item:', error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, [projectId]);

  const columnsGeneral = [
    { name: 'Item Code', selector: row => row.itemCode, sortable: true },
    { name: 'Category', selector: row => row.category, sortable: true },
    { name: 'Storage', selector: row => row.storage, sortable: true },
    { name: 'Entry Date', selector: row => row.entryDate, sortable: true },
    { name: 'Unit', selector: row => row.unit, sortable: true },
    { name: 'Unit Price', selector: row => row.unitPrice, sortable: true },
    { name: 'Total Price', selector: row => row.totalPrice, sortable: true },
    { name: 'Observations', selector: row => row.observations, sortable: true },
  ];

  const columnsCasaDimidex = [
    // Define columns for Casa Dimidex Inventory
  ];

  const columnsOficinaLima = [
    // Define columns for Oficina Lima Inventory
  ];

  const [selectedOption, setSelectedOption] = useState('General');

  return (
    <div>
      <h1>Inventory</h1>
      <button onClick={() => handleShow()}>Add New Item</button>

      {selectedOption === 'General' && (
        <DataTable
          title="General Inventory"
          columns={columnsGeneral}
          data={inventory.filter((item) => item.project === 'General')}
          pagination
        />
      )}
      {selectedOption === 'CasaDimidex' && (
        <DataTable
          title="Casa Dimidex Inventory"
          columns={columnsCasaDimidex}
          data={inventory.filter((item) => item.project === 'Casa Dimidex')}
          pagination
        />
      )}
      {selectedOption === 'OficinaLima' && (
        <DataTable
          title="Oficina Lima Inventory"
          columns={columnsOficinaLima}
          data={inventory.filter((item) => item.project === 'Oficina Lima')}
          pagination
        />
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Inventory Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="itemCode">
              <Form.Label>Item Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter item code"
                onChange={(e) => setFormData({ ...formData, itemCode: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option>Construction</option>
                <option>Finish</option>
                <option>Completed</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="storage">
              <Form.Label>Storage</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setFormData({ ...formData, storage: e.target.value })}
              >
                <option>Storage 1</option>
                <option>Arriving</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="entryDate">
              <Form.Label>Entry Date</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setFormData({ ...formData, entryDate: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="unit">
              <Form.Label>Unit</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              >
                <option>kg</option>
                <option>m³</option>
                <option>m</option>
                <option>unit</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="unitPrice">
              <Form.Label>Unit Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter unit price"
                onChange={(e) => setFormData({ ...formData, unitPrice: parseFloat(e.target.value) })}
              />
            </Form.Group>
            <Form.Group controlId="totalPrice">
              <Form.Label>Total Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter total price"
                onChange={(e) => setFormData({ ...formData, totalPrice: parseFloat(e.target.value) })}
              />
            </Form.Group>
            <Form.Group controlId="observations">
              <Form.Label>Observations</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter observations"
                onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Item
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Inventory;