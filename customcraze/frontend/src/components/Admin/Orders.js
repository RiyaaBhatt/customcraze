import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './Orders.css'
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders/');
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const openModal = (order) => {
    setSelectedOrder(order);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedOrder(null);
  };

  const handleAccept = async () => {
    try {
      await axios.put(`/api/orders/${selectedOrder.id}/`, { status: 'completed' });
      setOrders(orders.map(order => order.id === selectedOrder.id ? { ...order, status: 'completed' } : order));
      closeModal();
    } catch (err) {
      console.error('Failed to update order status');
    }
  };

  const handleCancel = async () => {
    try {
      await axios.put(`/api/orders/${selectedOrder.id}/`, { status: 'cancelled' });
      setOrders(orders.map(order => order.id === selectedOrder.id ? { ...order, status: 'cancelled' } : order));
      closeModal();
    } catch (err) {
      console.error('Failed to update order status');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Item</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.item.name}</td>
              <td>{order.status}</td>
              <td>
                <button onClick={() => openModal(order)}>Expand</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOrder && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Order Details"
          ariaHideApp={false}
        >
          <div>
            <button onClick={closeModal} style={{ float: 'left' }}>Close</button>
            <h2>Order ID: {selectedOrder.id}</h2>
            <p><strong>Item:</strong> {selectedOrder.item.name}</p>
            <p><strong>Design:</strong> {selectedOrder.design ? <img src={selectedOrder.design} alt="Design" style={{ width: '100px' }} /> : 'N/A'}</p>
            <p><strong>Template:</strong> {selectedOrder.template ? selectedOrder.template.name : 'N/A'}</p>
            <p><strong>Name:</strong> {selectedOrder.name}</p>
            <p><strong>Address:</strong> {selectedOrder.address}</p>
            <p><strong>Email:</strong> {selectedOrder.email}</p>
            <p><strong>Price:</strong> {selectedOrder.price}</p>
            <p><strong>Phone:</strong> {selectedOrder.phone}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Created At:</strong> {new Date(selectedOrder.created_at).toLocaleString()}</p>
            <p><strong>Updated At:</strong> {new Date(selectedOrder.updated_at).toLocaleString()}</p>

            <div style={{ marginTop: '20px' }}>
              <button onClick={handleAccept} style={{ marginRight: '10px' }}>Accept</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Orders;
