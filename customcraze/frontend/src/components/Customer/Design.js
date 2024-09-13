import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import { BsUpload, BsCardList, BsMagic, BsFillGridFill, BsDownload } from 'react-icons/bs';
import axios from 'axios';
import { fabric } from 'fabric-pure-browser';

const Design = ({ selectedItem }) => {
  const [canvasContent, setCanvasContent] = useState(selectedItem);
  const [uploadedDesign, setUploadedDesign] = useState(null);
  const [designTemplates, setDesignTemplates] = useState([]);
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const canvasRef = useRef(null);
  const fabricCanvas = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      fabricCanvas.current = new fabric.Canvas(canvasRef.current, {
        width: 800,
        height: 600,
      });

      if (canvasContent.image) {
        loadImageWithCors(canvasContent.image, (img) => {
          const canvasWidth = fabricCanvas.current.width;
          const canvasHeight = fabricCanvas.current.height;

          img.set({
            left: (canvasWidth - img.width * img.scaleX) / 2,
            top: (canvasHeight - img.height * img.scaleY) / 2,
            selectable: false,
          });
          fabricCanvas.current.add(img);
          fabricCanvas.current.renderAll();
        });
      }
    }
  }, [canvasContent]);const loadImageWithCors = (url, callback) => {
    fabric.Image.fromURL(url, callback, { crossOrigin: 'anonymous' });
  };
  

  const handleUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setUploadedDesign(e.target.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (fabricCanvas.current && uploadedDesign) {
      loadImageWithCors(uploadedDesign, (img) => {
        const canvasWidth = fabricCanvas.current.width;
        const canvasHeight = fabricCanvas.current.height;

        img.set({
          left: (canvasWidth - img.width * img.scaleX) / 2,
          top: (canvasHeight - img.height * img.scaleY) / 2,
          selectable: true,
          scaleX: 0.5,
          scaleY: 0.5,
        });
        fabricCanvas.current.add(img).setActiveObject(img);
        fabricCanvas.current.renderAll();
      });
    }
  }, [uploadedDesign]);

  const fetchDesignTemplates = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/customization-templates/');
      setDesignTemplates(response.data);
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  const toggleRightSidebar = () => {
    setShowRightSidebar(!showRightSidebar);
    if (!showRightSidebar) {
      fetchDesignTemplates();
    }
  };

  const addDesignToCanvas = (imageUrl) => {
    if (fabricCanvas.current) {
      loadImageWithCors(imageUrl, (img) => {
        const canvasWidth = fabricCanvas.current.width;
        const canvasHeight = fabricCanvas.current.height;

        img.set({
          left: (canvasWidth - img.width * img.scaleX) / 2,
          top: (canvasHeight - img.height * img.scaleY) / 2,
          selectable: true,
          scaleX: 0.5,
          scaleY: 0.5,
        });
        fabricCanvas.current.add(img).setActiveObject(img);
        fabricCanvas.current.renderAll();
      });
    }
    setShowRightSidebar(false);
  };

  const downloadCanvas = () => {
    if (fabricCanvas.current) {
      try {
        const dataURL = fabricCanvas.current.toDataURL({ format: 'jpeg', quality: 0.8 });
        console.log('Data URL:', dataURL);
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'design.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => {
          alert('Downloaded successfully!');
        }, 100);
      } catch (error) {
        console.error('Error downloading canvas:', error);
      }
    }
  };

  return (
    <Container fluid className="p-3">
      <Row>
        <Col md={1} className="border-end text-center">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <input
                type="file"
                style={{ display: 'none' }}
                id="upload-input"
                onChange={handleUpload}
              />
              <Button
                variant="link"
                className="w-100 text-center p-3"
                onClick={() => document.getElementById('upload-input').click()}
              >
                <BsUpload size={24} />
              </Button>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                variant="link"
                className="w-100 text-center p-3"
                onClick={toggleRightSidebar}
              >
                <BsCardList size={24} />
              </Button>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button variant="link" className="w-100 text-center p-3">
                <BsMagic size={24} />
              </Button>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button variant="link" className="w-100 text-center p-3">
                <BsFillGridFill size={24} />
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={showRightSidebar ? 9 : 11} style={{ position: 'relative' }}>
          <h4>Design Your Product</h4>
          <div className="design-area">
            <canvas ref={canvasRef} />
            <p>{canvasContent.description}</p>
            <p>
              <strong>Price:</strong> ${canvasContent.price}
            </p>
            <Button
              variant="primary"
              style={{ position: 'absolute', top: 20, right: 20 }}
              onClick={downloadCanvas}
            >
              <BsDownload size={24} />
            </Button>
          </div>
        </Col>

        {showRightSidebar && (
          <Col md={2} className="border-start p-3" style={{ backgroundColor: '#f8f9fa', overflowY: 'auto', maxHeight: '600px' }}>
            <h5>Design Templates</h5>
            <div className="design-templates-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {designTemplates.length > 0 ? (
                designTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="design-template-item"
                    style={{ width: '48%', cursor: 'pointer' }}
                    onClick={() => addDesignToCanvas(template.image)}
                  >
                    <img
                      src={template.image}
                      alt="Design Template"
                      style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                    />
                  </div>
                ))
              ) : (
                <p>No design templates available.</p>
              )}
            </div>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Design;
