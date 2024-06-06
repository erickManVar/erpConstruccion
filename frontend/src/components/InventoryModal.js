import React from 'react';
import { Modal } from 'react-bootstrap';
import InventoryForm from './InventoryForm';

const InventoryModal = ({ show, handleClose, formData, handleInputChange, handleSubmit, projects, users, isEditing }) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{isEditing ? 'Editar Item del Inventario' : 'Añadir Item al Inventario'}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <InventoryForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        projects={projects}
        users={users}
        isEditing={isEditing}
      />
    </Modal.Body>
  </Modal>
);

export default InventoryModal;
