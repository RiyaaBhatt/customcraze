import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Item</th>
          <th>Design</th>
          <th>Template</th>
          <th>Name</th>
          <th>Address</th>
          <th>Email</th>
          <th>Price</th>
          <th>Phone</th>
          <th>Status</th>
          <th>Created At</th>
          <th>Updated At</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.item.name}</td>
            <td>
              {order.design ? (
                <img src={order.design} alt="Design" style={{ width: '100px' }} />
              ) : (
                'N/A'
              )}
            </td>
            <td>{order.template ? order.template.name : 'N/A'}</td>
            <td>{order.name}</td>
            <td>{order.address}</td>
            <td>{order.email}</td>
            <td>{order.price}</td>
            <td>{order.phone}</td>
            <td>{order.status}</td>
            <td>{new Date(order.created_at).toLocaleString()}</td>

          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Orders;
