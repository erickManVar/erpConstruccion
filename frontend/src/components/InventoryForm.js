import React, { useEffect } from 'react';
import { Form, Input, Select, Button } from 'antd';

const InventoryForm = ({ formData, handleInputChange, handleSubmit, projects, users, isEditing }) => {
  useEffect(() => {
    const totalPrice = (formData.unitPrice * formData.quantity).toFixed(3);
    handleInputChange({ target: { name: 'totalPrice', value: totalPrice } });
  }, [formData.unitPrice, formData.quantity, handleInputChange]);

  return (
    <Form onFinish={handleSubmit} initialValues={formData}>
      <Form.Item label="Código del Item" name="itemCode">
        <Input name="itemCode" value={formData.itemCode} onChange={handleInputChange} readOnly />
      </Form.Item>
      <Form.Item label="Nombre del Item" name="itemName">
        <Input name="itemName" value={formData.itemName} onChange={handleInputChange} required />
      </Form.Item>
      <Form.Item label="Categoría" name="category">
        <Select name="category" value={formData.category} onChange={(value) => handleInputChange({ target: { name: 'category', value } })} required>
          <Select.Option value="Casco">Casco</Select.Option>
          <Select.Option value="Acabado">Acabado</Select.Option>
          <Select.Option value="Por Llegar">Por Llegar</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Almacén" name="storage">
        <Select name="storage" value={formData.storage} onChange={(value) => handleInputChange({ target: { name: 'storage', value } })} required>
          <Select.Option value="">Selecciona el Almacén</Select.Option>
          {projects.map((project) => (
            <Select.Option key={project._id} value={project.name}>
              {project.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Fecha de Ingreso del Item" name="entryDate">
        <Input type="date" name="entryDate" value={formData.entryDate} onChange={handleInputChange} required />
      </Form.Item>
      <Form.Item label="Unidad de Medida" name="measurementUnit">
        <Select name="measurementUnit" value={formData.measurementUnit} onChange={(value) => handleInputChange({ target: { name: 'measurementUnit', value } })} required>
          <Select.Option value="kg">kg</Select.Option>
          <Select.Option value="m³">m³</Select.Option>
          <Select.Option value="m">m</Select.Option>
          <Select.Option value="unit">unit</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Precio por Unidad" name="unitPrice">
        <Input type="number" step="0.001" name="unitPrice" value={formData.unitPrice} onChange={handleInputChange} required />
      </Form.Item>
      <Form.Item label="Cantidad" name="quantity">
        <Input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} required />
      </Form.Item>
      <Form.Item label="Precio Total" name="totalPrice">
        <Input type="number" name="totalPrice" value={formData.totalPrice} readOnly />
      </Form.Item>
      <Form.Item label="Observaciones" name="observations">
        <Input.TextArea name="observations" value={formData.observations} onChange={handleInputChange} rows={3} />
      </Form.Item>
      <Form.Item label="Nombre del Proyecto" name="projectName">
        <Select name="projectName" value={formData.projectName} onChange={(value) => handleInputChange({ target: { name: 'projectName', value } })} required>
          <Select.Option value="">Selecciona el Proyecto</Select.Option>
          {projects.map((project) => (
            <Select.Option key={project._id} value={project.name}>
              {project.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Entregado a" name="deliveredTo">
        <Select name="deliveredTo" value={formData.deliveredTo} onChange={(value) => handleInputChange({ target: { name: 'deliveredTo', value } })} required>
          <Select.Option value="">Selecciona el Usuario</Select.Option>
          {users.map((user) => (
            <Select.Option key={user._id} value={user.name}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Total de Unidades del Proyecto" name="totalProjectAmount">
        <Input type="number" name="totalProjectAmount" value={formData.totalProjectAmount} onChange={handleInputChange} required />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {isEditing ? 'Guardar Cambios' : 'Añadir Item'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default InventoryForm;
