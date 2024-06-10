import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Button, Form, Input, List, Popconfirm } from 'antd';
import axios from 'axios';

const ItemLogModal = ({ visible, onClose, itemId }) => {
  const [logs, setLogs] = useState([]);
  const [newLog, setNewLog] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  const fetchLogs = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3000/logs/${itemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setLogs(response.data);
    } catch (error) {
      console.error('Failed to fetch logs:', error);
    }
  }, [itemId]);

  const fetchCurrentUser = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3000/auth/current', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCurrentUser(response.data);
    } catch (error) {
      console.error('Failed to fetch current user:', error);
    }
  }, []);

  useEffect(() => {
    if (itemId) {
      fetchLogs();
      fetchCurrentUser();
    }
  }, [itemId, fetchLogs, fetchCurrentUser]);

  const handleAddLog = async () => {
    if (!newLog.trim()) return;

    try {
      const response = await axios.post('http://localhost:3000/logs', {
        itemId,
        content: newLog,
        createdBy: currentUser?._id,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setLogs([...logs, response.data]);
      setNewLog('');
    } catch (error) {
      console.error('Failed to add log:', error);
    }
  };

  const handleEditLog = async (logId, content) => {
    try {
      const response = await axios.put(`http://localhost:3000/logs/${logId}`, {
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
      await axios.delete(`http://localhost:3000/logs/${logId}`, {
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
    <Modal title="Item Logs" visible={visible} onCancel={onClose} footer={null}>
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
              title={log.createdBy?.name || 'Unknown User'}
              description={log.content}
            />
          </List.Item>
        )}
      />
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

export default ItemLogModal;
