import React from 'react';
import { Modal } from 'antd';
import ProjectsForm from './ProjectsForm';

const ProjectsModal = ({ open, handleClose, formData, handleInputChange, handleSubmit }) => (
  <Modal title="Create Project" open={open} onCancel={handleClose} footer={null}>
    <ProjectsForm
      formData={formData}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
    />
  </Modal>
);

export default ProjectsModal;
