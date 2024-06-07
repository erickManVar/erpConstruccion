import React from 'react';
import { Button, Modal } from 'antd';
import InventoryTable from './InventoryTable';
import InventoryForm from './InventoryForm';
import useInventory from '../hooks/useInventory';
import ItemDetail from './ItemDetail';

const Inventory = () => {
  const {
    projects,
    users,
    show,
    isEditing,
    formData,
    setView,
    handleShow,
    handleClose,
    handleInputChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    filteredInventory,
    loading,
    detailItem,
    handleDetailShow,
    handleDetailClose,
    showDetail
  } = useInventory();

  return (
    <div>
      <h1>Inventario</h1>
      <Button type="primary" onClick={handleShow}>Añadir Nuevo Item</Button>
      <Button onClick={() => setView('General')}>Inventario General</Button>
      <Button onClick={() => setView('Oficina Lima')}>Inventario Oficina Lima</Button>
      <Button onClick={() => setView('Casa Dimidex')}>Inventario Casa Dimidex</Button>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <InventoryTable
          inventory={filteredInventory}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDetail={handleDetailShow}
        />
      )}
      <Modal
        title={isEditing ? 'Editar Item del Inventario' : 'Añadir Item al Inventario'}
        open={show}
        onCancel={handleClose}
        footer={null}
      >
        <InventoryForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          projects={projects}
          users={users}
          isEditing={isEditing}
        />
      </Modal>
      {detailItem && (
        <ItemDetail
          show={showDetail}
          handleClose={handleDetailClose}
          item={detailItem}
        />
      )}
    </div>
  );
};

export default Inventory;
