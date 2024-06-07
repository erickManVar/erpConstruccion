import React from 'react';
import { Button, Popconfirm, Table } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const InventoryTable = ({ inventory, onEdit, onDelete, onDetail }) => {
  const columns = [
    { title: 'Código del Item', dataIndex: 'itemCode', key: 'itemCode', sorter: (a, b) => a.itemCode.localeCompare(b.itemCode) },
    { title: 'Nombre del Item', dataIndex: 'itemName', key: 'itemName', sorter: (a, b) => a.itemName.localeCompare(b.itemName) },
    { title: 'Categoría', dataIndex: 'category', key: 'category', sorter: (a, b) => a.category.localeCompare(b.category) },
    { title: 'Almacén', dataIndex: 'storage', key: 'storage', sorter: (a, b) => a.storage.localeCompare(b.storage) },
    { title: 'Fecha de Ingreso', dataIndex: 'entryDate', key: 'entryDate', render: (text) => new Date(text).toLocaleDateString(), sorter: (a, b) => new Date(a.entryDate) - new Date(b.entryDate) },
    { title: 'Unidad de Medida', dataIndex: 'measurementUnit', key: 'measurementUnit', sorter: (a, b) => a.measurementUnit.localeCompare(b.measurementUnit) },
    { title: 'Precio por Unidad', dataIndex: 'unitPrice', key: 'unitPrice', sorter: (a, b) => a.unitPrice - b.unitPrice },
    { title: 'Cantidad', dataIndex: 'quantity', key: 'quantity', sorter: (a, b) => a.quantity - b.quantity },
    { title: 'Precio Total', dataIndex: 'totalPrice', key: 'totalPrice', sorter: (a, b) => a.totalPrice - b.totalPrice },
    { title: 'Nombre del Proyecto', dataIndex: 'projectName', key: 'projectName', sorter: (a, b) => a.projectName.localeCompare(b.projectName) },
    { title: 'Entregado a', dataIndex: 'deliveredTo', key: 'deliveredTo', sorter: (a, b) => a.deliveredTo.localeCompare(b.deliveredTo) },
    {
      title: 'Acciones',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button icon={<EyeOutlined />} onClick={() => onDetail(record)} />
          <Button icon={<EditOutlined />} onClick={() => onEdit(record)} style={{ marginLeft: 8 }} />
          <Popconfirm title="¿Estás seguro de eliminar este item?" onConfirm={() => onDelete(record._id)}>
            <Button icon={<DeleteOutlined />} danger style={{ marginLeft: 8 }} />
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={inventory}
      pagination={{ pageSize: 10 }}
      rowKey="_id"
    />
  );
};

export default InventoryTable;
