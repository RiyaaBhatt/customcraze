import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import DesignCanvas from './DesignCanvas';

const UploadDesign = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Form.Group controlId="formFile">
        <Form.Label>Upload Your Design</Form.Label>
        <Form.Control type="file" onChange={handleFileChange} />
      </Form.Group>
      <Button variant="primary" onClick={() => setSelectedFile(uploadedImage)}>
        Upload Design
      </Button>
      {uploadedImage && (
        <div className="mt-3">
          <h5>Design Canvas</h5>
          <DesignCanvas uploadedImage={uploadedImage} />
        </div>
      )}
    </div>
  );
};

export default UploadDesign;