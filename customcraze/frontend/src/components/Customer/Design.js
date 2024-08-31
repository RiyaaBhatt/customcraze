import React, { useState } from 'react';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import { BsUpload, BsCardList, BsMagic, BsFillGridFill } from 'react-icons/bs';

const Desgin = ({ selectedItem }) => {
  const [canvasContent, setCanvasContent] = useState(selectedItem);

  return (
    <Container fluid className="p-3">
      <Row>
        {/* Sidebar */}
        <Col md={1} className="border-end text-center">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Button variant="link" className="w-100 text-center p-3">
                <BsUpload size={24} />
              </Button>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button variant="link" className="w-100 text-center p-3">
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

        {/* Main Content Area */}
        <Col md={11}>
          <h4>Design Your Product</h4>
          <div className="design-area">
            {canvasContent ? (
              <div className="canvas">
                <h5>{canvasContent.name}</h5>
                <img src={canvasContent.image} alt={canvasContent.name} />
                <p>{canvasContent.description}</p>
                <p><strong>Price:</strong> ${canvasContent.price}</p>
              </div>
            ) : (
              <p>Select a design option from the left to get started!</p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Desgin;
