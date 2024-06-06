import React from 'react';
import { Form, Button } from 'react-bootstrap';

const InventoryForm = ({ formData, handleInputChange, handleSubmit, projects, users, isEditing, setFormData }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId="itemCode">
      <Form.Label>Código del Item</Form.Label>
      <Form.Control
        type="text"
        placeholder="..."
        name="itemCode"
        value={formData.itemCode}
        onChange={handleInputChange}
        readOnly
      />
    </Form.Group>
    <Form.Group controlId="itemName">
      <Form.Label>Nombre del Item</Form.Label>
      <Form.Control
        type="text"
        placeholder="Ingresa el nombre del item"
        name="itemName"
        value={formData.itemName}
        onChange={handleInputChange}
        required
      />
    </Form.Group>
    <Form.Group controlId="category">
      <Form.Label>Categoría</Form.Label>
      <Form.Control
        as="select"
        name="category"
        value={formData.category}
        onChange={handleInputChange}
        required
      >
        <option>Casco</option>
        <option>Acabado</option>
        <option>Por Llegar</option>
      </Form.Control>
    </Form.Group>
    <Form.Group controlId="storage">
      <Form.Label>Almacén</Form.Label>
      <Form.Control
        as="select"
        name="storage"
        value={formData.storage}
        onChange={handleInputChange}
        required
      >
        <option value="">Selecciona el Almacén</option>
        {projects.map((project) => (
          <option key={project._id} value={project.name}>
            {project.name}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
    <Form.Group controlId="entryDate">
      <Form.Label>Fecha de Ingreso del Item</Form.Label>
      <Form.Control
        type="date"
        name="entryDate"
        value={formData.entryDate}
        onChange={handleInputChange}
        required
      />
    </Form.Group>
    <Form.Group controlId="measurementUnit">
      <Form.Label>Unidad de Medida</Form.Label>
      <Form.Control
        as="select"
        name="measurementUnit"
        value={formData.measurementUnit}
        onChange={handleInputChange}
        required
      >
        <option>kg</option>
        <option>m³</option>
        <option>m</option>
        <option>unit</option>
      </Form.Control>
    </Form.Group>
    <Form.Group controlId="unitPrice">
      <Form.Label>Precio por Unidad</Form.Label>
      <Form.Control
        type="number"
        step="0.001" // Allowing decimal values with up to 3 decimal places
        placeholder="Ingresa Precio x unid."
        name="unitPrice"
        value={formData.unitPrice}
        onChange={handleInputChange}
        required
      />
    </Form.Group>
    <Form.Group controlId="quantity">
      <Form.Label>Cantidad</Form.Label>
      <Form.Control
        type="number"
        placeholder="Ingresa la cantidad"
        name="quantity"
        value={formData.quantity}
        onChange={handleInputChange}
        required
      />
    </Form.Group>
    <Form.Group controlId="totalPrice">
      <Form.Label>Precio Total</Form.Label>
      <Form.Control
        type="number"
        placeholder="..."
        name="totalPrice"
        value={(formData.unitPrice * formData.quantity).toFixed(3).replace(/\.?0+$/, '')} // Removing unnecessary trailing zeros
        readOnly
      />
    </Form.Group>
    <Form.Group controlId="observations">
      <Form.Label>Observaciones</Form.Label>
      <Form.Control
        as="textarea"
        placeholder="Ingresa observaciones"
        name="observations"
        rows={3}
        value={formData.observations}
        onChange={handleInputChange}
      />
    </Form.Group>
    <Form.Group controlId="projectName">
      <Form.Label>Nombre del Proyecto</Form.Label>
      <Form.Control
        as="select"
        name="projectName"
        value={formData.projectName}
        onChange={handleInputChange}
        required
      >
        <option value="">Selecciona el Proyecto</option>
        {projects.map((project) => (
          <option key={project._id} value={project.name}>
            {project.name}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
    <Form.Group controlId="deliveredTo">
      <Form.Label>Entregado a</Form.Label>
      <Form.Control
        as="select"
        name="deliveredTo"
        value={formData.deliveredTo}
        onChange={handleInputChange}
        required
      >
        <option value="">Selecciona el Usuario</option>
        {users.map((user) => (
          <option key={user._id} value={user.name}>
            {user.name}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
    <Form.Group controlId="totalProjectAmount">
      <Form.Label>Total de Unidades del Proyecto</Form.Label>
      <Form.Control
        type="number"
        placeholder="Ingresa la cantidad total"
        name="totalProjectAmount"
        value={formData.totalProjectAmount}
        onChange={handleInputChange}
        required
      />
    </Form.Group>
    <Button variant="primary" type="submit">
      {isEditing ? 'Guardar Cambios' : 'Añadir Item'}
    </Button>
  </Form>
);

export default InventoryForm;
