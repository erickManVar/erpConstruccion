import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import InventoryTable from './InventoryTable';
import InventoryModal from './InventoryModal';
import ItemDetail from './ItemDetail';
import useInventory from '../hooks/useInventory';

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
    setFormData,
    filteredInventory,
    loading,
  } = useInventory();
  const [detailItem, setDetailItem] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const handleDetailShow = (item) => {
    setDetailItem(item);
    setShowDetail(true);
  };

  const handleDetailClose = () => {
    setDetailItem(null);
    setShowDetail(false);
  };

  return (
    <div>
      <h1>Inventario</h1>
      <Button onClick={handleShow}>Añadir Nuevo Item</Button>
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
          onDetail={handleDetailShow} // Pass the detail handler
        />
      )}
      <InventoryModal
        show={show}
        handleClose={handleClose}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        projects={projects}
        users={users}
        isEditing={isEditing}
        setFormData={setFormData}
      />
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
