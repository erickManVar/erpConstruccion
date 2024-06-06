import React from 'react';
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';

const InventoryTable = ({ inventory, onEdit, onDelete, onDetail }) => {
  const columns = [
    { name: 'Código del Item', selector: (row) => row.itemCode, sortable: true },
    { name: 'Nombre del Item', selector: (row) => row.itemName, sortable: true },
    { name: 'Categoría', selector: (row) => row.category, sortable: true },
    { name: 'Almacén', selector: (row) => row.storage, sortable: true },
    { name: 'Fecha de Ingreso', selector: (row) => new Date(row.entryDate).toLocaleDateString(), sortable: true },
    { name: 'Unidad de Medida', selector: (row) => row.measurementUnit, sortable: true },
    { name: 'Precio por Unidad', selector: (row) => row.unitPrice, sortable: true },
    { name: 'Cantidad', selector: (row) => row.quantity, sortable: true },
    { name: 'Precio Total', selector: (row) => row.totalPrice, sortable: true },
    { name: 'Nombre del Proyecto', selector: (row) => row.projectName, sortable: true },
    { name: 'Entregado a', selector: (row) => row.deliveredTo, sortable: true },
    {
      name: 'Acciones',
      cell: (row) => (
        <>
          <Button onClick={() => onDetail(row)} variant="primary" size="sm" className="mr-2">Ver</Button>
          <Button onClick={() => onEdit(row)} variant="info" size="sm" className="mr-2">Editar</Button>
          <Button onClick={() => onDelete(row._id)} variant="danger" size="sm">Eliminar</Button>
        </>
      ),
    },
  ];

  return (
    <DataTable
      title="Inventario"
      columns={columns}
      data={inventory}
      pagination
    />
  );
};

export default InventoryTable;
