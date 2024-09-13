import React from 'react';
import { useLocation } from 'react-router-dom';
import Desgin from './Design';

const DesignPage = () => {
  const location = useLocation();
  const { selectedItem } = location.state || {}; // Retrieve the selected item

  return (
    <div>
      <center>
      <Desgin selectedItem={selectedItem} /></center>
    </div>
  );
};

export default DesignPage;
