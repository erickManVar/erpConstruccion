import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [view, setView] = useState('General');
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchInventory = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/inventory', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setInventory(response.data);
    } catch (error) {
      console.error('Failed to fetch inventory:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProjects = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3000/projects', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setProjects(response.data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3000/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  }, []);

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
    fetchInventory();
    fetchProjects();
    fetchUsers();
    fetchCurrentUser();
  }, [fetchInventory, fetchProjects, fetchUsers, fetchCurrentUser]);

  const handleSubmit = async (values) => {
    const data = {
      ...values,
      totalPrice: (values.unitPrice * values.quantity).toFixed(3),
    };

    try {
      if (isEditing) {
        await axios.put(`http://localhost:3000/inventory/${values._id}`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      } else {
        await axios.post('http://localhost:3000/inventory', data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      }
      fetchInventory();
      handleClose();
    } catch (error) {
      console.error('Failed to save inventory item:', error);
    }
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setFormData(item);
    handleShow();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/inventory/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchInventory();
    } catch (error) {
      console.error('Failed to delete inventory item:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const filteredInventory = inventory.filter((item) => view === 'General' || item.projectName === view);

  return {
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
    currentUser,
  };
};

export default useInventory;
