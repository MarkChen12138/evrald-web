import React from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function Database() {
  return (
    <>
      <Container fluid>
        <Card.Title as="h4">
          SM Grid <small>Collapsed at 576px</small>
        </Card.Title>
        <Row>
          <Col sm="4">
            <Card>
              <Card.Img src={require("assets/img/blog-1.jpg")}></Card.Img>
              <Card.Body className="text-center">
                <code>{`<Col sm={4}>...</Col>`}</code>
              </Card.Body>
            </Card>
          </Col>
          <Col sm="4">
            <Card>
              <Card.Body className="text-center">
                <code>{`<Col sm={4}>...</Col>`}</code>
              </Card.Body>
            </Card>
          </Col>
          <Col sm="4">
            <Card>
              <Card.Body className="text-center">
                <code>{`<Col sm={4}>...</Col>`}</code>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

function GridExample() {
  return (
    <Row xs={1} md={2} className="g-4">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Col key={idx}>
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Database;
