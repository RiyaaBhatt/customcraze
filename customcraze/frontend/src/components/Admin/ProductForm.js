// import React, { useState, useEffect } from 'react';
// import { Form, Button } from 'react-bootstrap';

// const getCSRFToken = () => {
//   const cookieValue = document.cookie.split('; ').find(row => row.startsWith('csrftoken='));
//   return cookieValue ? cookieValue.split('=')[1] : '';
// };

// const ProductForm = ({ product, onClose, onSave }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     image: null // For image file
//   });

//   useEffect(() => {
//     if (product) {
//       setFormData({
//         name: product.name || '',
//         description: product.description || '',
//         price: product.price || '',
//         image: null // Reset image file input
//       });
//     }
//   }, [product]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//       image: files ? files[0] : formData.image
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formDataToSend = new FormData();
//     formDataToSend.append('name', formData.name);
//     formDataToSend.append('description', formData.description);
//     formDataToSend.append('price', formData.price);
//     if (formData.image) {
//       formDataToSend.append('image', formData.image);
//     }

//     const url = product ? `http://localhost:8000/api/productapi/${product.item_id}/` : 'http://localhost:8000/api/productapi/';
//     const method = product ? 'PUT' : 'POST';

//     try {
//       const response = await fetch(url, {
//         method: method,
//         body: formDataToSend,
//         headers: {
//           'Accept': 'application/json',
//           'X-CSRFToken': getCSRFToken() // Add CSRF token here
//         }
//       });

//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//       onSave();
//     } catch (error) {
//       console.error('Error saving product:', error);
//     }
//     onClose();
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <Form.Group controlId="formName">
//         <Form.Label>Name</Form.Label>
//         <Form.Control
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />
//       </Form.Group>

//       <Form.Group controlId="formDescription">
//         <Form.Label>Description</Form.Label>
//         <Form.Control
//           type="text"
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           required
//         />
//       </Form.Group>

//       <Form.Group controlId="formPrice">
//         <Form.Label>Price</Form.Label>
//         <Form.Control
//           type="number"
//           name="price"
//           value={formData.price}
//           onChange={handleChange}
//           required
//         />
//       </Form.Group>

//       <Form.Group controlId="formImage">
//         <Form.Label>Image</Form.Label>
//         <Form.Control
//           type="file"
//           name="image"
//           onChange={handleChange}
//         />
//       </Form.Group>

//       <Button variant="primary" type="submit">
//         {product ? 'Update Product' : 'Add Product'}
//       </Button>
//     </Form>
//   );
// };

// export default ProductForm;
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const ProductForm = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null // For image file
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        image: null // Reset image file input
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      image: files ? files[0] : formData.image
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    const csrfToken = getCookie('csrftoken'); // Function to get CSRF token from cookie
    const url = product ? `http://localhost:8000/productapi/${product.item_id}/` : 'http://localhost:8000/productapi/';
    const method = product ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        body: formDataToSend,
        headers: {
          'X-CSRFToken': csrfToken
        },
        credentials: 'include' // Include CSRF token
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      onSave();
    } catch (error) {
      console.error('Error saving product:', error);
    }
    onClose();
  };

  return (
    <Form onSubmit={handleSubmit} method="POST" encType="multipart/form-data"> 
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
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

      <Button variant="primary" type="submit">
        {product ? 'Update Product' : 'Add Product'}
      </Button>
    </Form>
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

export default ProductForm;

