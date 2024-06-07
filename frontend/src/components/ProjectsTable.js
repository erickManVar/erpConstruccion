import React from 'react';
import { Table, Button } from 'antd';
import moment from 'moment';

const ProjectsTable = ({ projects, onEdit, onDelete }) => {
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Start Date', dataIndex: 'startDate', key: 'startDate', render: (text) => moment(text).format('YYYY-MM-DD') },
    { title: 'End Date', dataIndex: 'endDate', key: 'endDate', render: (text) => moment(text).format('YYYY-MM-DD') },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button onClick={() => onEdit(record)} type="default" style={{ marginRight: 8 }}>Edit</Button>
          <Button onClick={() => onDelete(record._id)} type="danger">Delete</Button>
        </>
      ),
    },
  ];

  return (
    <Table columns={columns} dataSource={projects} rowKey="_id" pagination={true} />
  );
};

export default ProjectsTable;
