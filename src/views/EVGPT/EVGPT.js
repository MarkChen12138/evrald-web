import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/demo.css"; // 创建一个单独的CSS文件，用于自定义样式

const EVGPT = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [recommendations, setRecommendations] = useState([
    "帮我看看公司最近的利润增长，用饼状图来告诉我",
    "帮我整理一下近期公司的出库量的情况",
    "帮我找找最近市场上的原油报价",
  ]);

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
    <Card className="mb-3">
      <Card.Header as="h5">EVGPT</Card.Header>
      <Card.Body className="chat-body">
        {messages.length === 0 && (
          <div className="recommendations">
            {recommendations.map((text, index) => (
              <Card key={index} onClick={() => handleRecommendationClick(text)}>
                {text}
              </Card>
            ))}
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
  );
};

export default EVGPT;
