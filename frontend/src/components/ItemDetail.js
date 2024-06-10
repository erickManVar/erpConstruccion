import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Button, Form, Input, List, Popconfirm } from 'antd';
import axios from 'axios';

const ItemDetail = ({ show, handleClose, item }) => {
  const [logs, setLogs] = useState([]);
  const [newLog, setNewLog] = useState('');

  const fetchLogs = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/logs/${item._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setLogs(response.data);
    } catch (error) {
      console.error('Failed to fetch logs:', error);
    }
  }, [item]);

  useEffect(() => {
    if (item) {
      fetchLogs();
    }
  }, [item, fetchLogs]);

  const handleAddLog = async () => {
    if (!newLog.trim()) return;

    try {
      const response = await axios.post(
        'http://localhost:3000/api/logs',
        {
          itemId: item._id,
          content: newLog,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setLogs([...logs, response.data]);
      setNewLog('');
    } catch (error) {
      console.error('Failed to add log:', error);
    }
  };

  const handleEditLog = async (logId, content) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/logs/${logId}`, {
        content,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setLogs(logs.map(log => log._id === logId ? response.data : log));
    } catch (error) {
      console.error('Failed to edit log:', error);
    }
  };

  const handleDeleteLog = async (logId) => {
    try {
      await axios.delete(`http://localhost:3000/api/logs/${logId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setLogs(logs.filter(log => log._id !== logId));
    } catch (error) {
      console.error('Failed to delete log:', error);
    }
  };

  return (
    <Modal title="Detalles del Item" open={show} onCancel={handleClose} footer={null} centered>
      <div className="item-details">
        <h5>Nombre del Item: {item.itemName}</h5>
        <p>Fecha de Ingreso: {new Date(item.entryDate).toLocaleDateString()}</p>
        <p>Unidad de Medida: {item.measurementUnit}</p>
        <p>Precio por Unidad: {item.unitPrice}</p>
        <p>Cantidad: {item.quantity}</p>
        <p>Precio Total: {item.totalPrice}</p>
        <p>Nombre del Proyecto: {item.projectName}</p>
        <p>Total del Proyecto: {item.totalProjectAmount}</p>
      </div>
      <div className="logs-section">
        <h5>Bitácora</h5>
        <List
          dataSource={logs}
          renderItem={log => (
            <List.Item
              actions={[
                <Button onClick={() => handleEditLog(log._id, prompt('Edit log:', log.content))}>Edit</Button>,
                <Popconfirm title="Are you sure to delete this log?" onConfirm={() => handleDeleteLog(log._id)}>
                  <Button type="danger">Delete</Button>
                </Popconfirm>
              ]}
            >
              <List.Item.Meta
                title={JSON.parse(log.createdBy).name || 'Unknown User'} // Parse createdBy to get the name
                description={log.content}
              />
            </List.Item>
          )}
        />
      </div>
      <Form layout="inline" onFinish={handleAddLog}>
        <Form.Item>
          <Input
            value={newLog}
            onChange={e => setNewLog(e.target.value)}
            placeholder="Add a new log"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleAddLog}>Add Log</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ItemDetail;
