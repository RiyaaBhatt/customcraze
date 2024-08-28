import React, { useState, useEffect } from 'react';
import { Modal, Button, Table, Pagination } from 'react-bootstrap';
import ProductForm from './ProductForm';

const Products = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/productapi/');
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Expected JSON, but received: ' + contentType);
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSave = () => {
    fetchProducts(); // Refresh product list
  };

  const handleDeleteProduct = async (id) => {
    const csrfToken = getCookie('csrftoken'); // Function to get CSRF token from cookie
  
    try {
      const response = await fetch(`http://localhost:8000/productapi/${id}/`, {
        method: 'DELETE',
        headers: {
          'X-CSRFToken': csrfToken,
          'Content-Type': 'application/json'
        },
        credentials: 'include' // Include CSRF token
      });
  
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
      fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Button variant="primary" onClick={handleAddProduct}>Add Product</Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(product => (
            <tr key={product.item_id}>
              <td>{product.item_id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>
                console.log(product.image)
                {product.image ? <img src={product.image} alt={product.name} style={{ width: '100px' }} /> : 'No image'}
              </td>
              <td>
                <Button variant="warning" onClick={() => handleEditProduct(product)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDeleteProduct(product.item_id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
        <Pagination.Item>{currentPage}</Pagination.Item>
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />
      </Pagination>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingProduct ? 'Edit Product' : 'Add Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductForm product={editingProduct} onClose={handleCloseModal} onSave={handleSave} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

// Function to get CSRF token from cookies
const getCookie = (name) => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

export default Products;
