import React from 'react';
import { Modal } from 'antd';
import InventoryForm from './InventoryForm';

const InventoryModal = ({ open, handleClose, formData, handleInputChange, handleSubmit, projects, users, isEditing }) => (
  <Modal title={isEditing ? 'Editar Item del Inventario' : 'Añadir Item al Inventario'} open={open} onCancel={handleClose} footer={null} centered>
    <InventoryForm
      formData={formData}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      projects={projects}
      users={users}
      isEditing={isEditing}
    />
  </Modal>
);

export default InventoryModal;
