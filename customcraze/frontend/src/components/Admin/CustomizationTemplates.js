import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const CustomizationTemplates = () => {
    const [templates, setTemplates] = useState([]);
    const [editingTemplate, setEditingTemplate] = useState(null);
    const [newData, setNewData] = useState({
        name: '',
        description: '',
        image: null
    });
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);  // Track whether it's an edit or add operation

    useEffect(() => {
        fetchTemplates();
    }, []);

    const fetchTemplates = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/customization-templates/');
            setTemplates(response.data);
        } catch (error) {
            console.error('Error fetching templates:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/customization-templates/${id}/`);
            setTemplates(templates.filter(template => template.id !== id));
        } catch (error) {
            console.error('Error deleting template:', error);
        }
    };

    const handleEdit = (template) => {
        setIsEditing(true);
        setEditingTemplate(template);
        setNewData({
            name: template.name,
            description: template.description,
            image: null // Reset image field
        });
        setShowModal(true); // Show modal on edit
    };

    const handleUpdate = async () => {
        const formData = new FormData();
        formData.append('name', newData.name);
        formData.append('description', newData.description);
        if (newData.image) {
            formData.append('image', newData.image);
        }
    
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/customization-templates/${editingTemplate.id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            fetchTemplates();  // Refresh the list
            setShowModal(false);  // Close the modal
            setEditingTemplate(null);  // Reset the editing state
            setNewData({ name: '', description: '', image: null });  // Reset the form
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating template:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                alert(`Update failed: ${JSON.stringify(error.response.data)}`);  // Show a user-friendly message
            } else {
                alert('Update failed: No response from server');
            }
        }
    };
    
    const handleAdd = () => {
        setIsEditing(false);
        setNewData({ name: '', description: '', image: null,created_by:"admin" });
        setShowModal(true);
    };

    const handleCreate = async () => {
        const formData = new FormData();
        formData.append('name', newData.name);
        formData.append('description', newData.description);
        formData.append('created_by', "admin");
        if (newData.image) {
            formData.append('image', newData.image);
        }

        try {
            await axios.post('http://127.0.0.1:8000/api/customization-templates/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            fetchTemplates();  // Refresh the list
            setShowModal(false);  // Close the modal
            setNewData({ name: '', description: '', image: null });  // Reset the form
        } catch (error) {
            console.error('Error creating template:', error);
            if (error.response) {
                alert(`Creation failed: ${JSON.stringify(error.response.data)}`);  // Show a user-friendly message
            }
        }
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setNewData({ ...newData, image: files[0] });
        } else {
            setNewData({ ...newData, [name]: value });
        }
    };

    return (
        <div className="container mt-5">
            <h2>Customization Templates</h2>
            <Button variant="success" onClick={handleAdd} className="mb-3">Add Template</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Created By</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {templates.map(template => (
                        <tr key={template.id}>
                            <td>{template.id}</td>
                            <td>{template.name}</td>
                            <td>{template.description}</td>
                            <td>
                                {template.image ? (
                                    <img src={template.image} alt={template.name} width="100" />
                                ) : (
                                    'No Image'
                                )}
                            </td>
                            <td>{template.created_by}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleEdit(template)}>Edit</Button>{' '}
                                <Button variant="danger" onClick={() => handleDelete(template.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Edit Template' : 'Add Template'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={newData.name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                value={newData.description}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formImage">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                name="image"
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={isEditing ? handleUpdate : handleCreate}>
                        {isEditing ? 'Update' : 'Add'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CustomizationTemplates;