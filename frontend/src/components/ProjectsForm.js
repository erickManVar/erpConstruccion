import React from 'react';
import { Form, Input, Button, DatePicker } from 'antd';
import moment from 'moment';

const ProjectsForm = ({ formData, handleInputChange, handleSubmit }) => (
  <Form layout="vertical" onFinish={handleSubmit} initialValues={formData}>
    <Form.Item label="Nombre" name="name" rules={[{ required: true, message: 'Please input the project name!' }]}>
      <Input placeholder="Enter project name" value={formData.name} onChange={handleInputChange} />
    </Form.Item>
    <Form.Item label="Descripción" name="description" rules={[{ required: true, message: 'Please input the project description!' }]}>
      <Input placeholder="Enter project description" value={formData.description} onChange={handleInputChange} />
    </Form.Item>
    <Form.Item label="Fecha de Inicio" name="startDate" rules={[{ required: true, message: 'Please select the start date!' }]}>
      <DatePicker value={formData.startDate ? moment(formData.startDate) : null} onChange={(date) => handleInputChange({ target: { name: 'startDate', value: date } })} />
    </Form.Item>
    <Form.Item label="Fecha de Fin" name="endDate" rules={[{ required: true, message: 'Please select the end date!' }]}>
      <DatePicker value={formData.endDate ? moment(formData.endDate) : null} onChange={(date) => handleInputChange({ target: { name: 'endDate', value: date } })} />
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit">Create Project</Button>
    </Form.Item>
  </Form>
);

export default ProjectsForm;
