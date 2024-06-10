import React, { useState } from 'react';
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

  const [logModalVisible, setLogModalVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleLogShow = (itemId) => {
    setSelectedItemId(itemId);
    setLogModalVisible(true);
  };

  const handleLogClose = () => {
    setSelectedItemId(null);
    setLogModalVisible(false);
  };

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
          onLog={handleLogShow} // Use handleLogShow specifically for logs
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
      <ItemDetail
        show={logModalVisible}
        handleClose={handleLogClose}
        item={{ _id: selectedItemId }}
      />
    </div>
  );
};

export default Inventory;
