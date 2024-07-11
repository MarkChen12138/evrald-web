import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/demo.css"; // 创建一个单独的CSS文件，用于自定义样式

const EVGPT = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;

    const newMessage = {
      id: messages.length,
      text: input,
      sender: "user",
    };

    setMessages([...messages, newMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 1,
        text: `AI Response to "${input}"`,
        sender: "ai",
      };
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    }, 1000);
  };

  const handleRecommendationClick = (text) => {
    setInput(text);
    handleSend();
  };

  return (
    <Container fluid className="p-3">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="mb-3">
            <Card.Header as="h5">EVGPT Chat</Card.Header>
            <Card.Body className="chat-body">
              {messages.length === 0 && (
                <div className="recommendations">
                  <Button onClick={() => handleRecommendationClick("推荐项1")}>
                    推荐项1
                  </Button>
                  <Button onClick={() => handleRecommendationClick("推荐项2")}>
                    推荐项2
                  </Button>
                  <Button onClick={() => handleRecommendationClick("推荐项3")}>
                    推荐项3
                  </Button>
                </div>
              )}
              {messages.map((msg) => (
                <div key={msg.id} className={`message ${msg.sender}`}>
                  <span>{msg.text}</span>
                </div>
              ))}
            </Card.Body>
            <Card.Footer>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="d-flex"
              >
                <Form.Control
                  type="text"
                  placeholder="Type a message"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="mr-2"
                />
                <Button variant="primary" onClick={handleSend}></Button>
              </Form>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EVGPT;
