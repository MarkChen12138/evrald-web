import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/scss/lbd/_evgpt.scss";

const RecommendedQuestions = ({ handleRecommendationClick }) => {
  const recommendations = [
    "帮我看看公司最近的利润增长，用饼状图来告诉我",
    "帮我整理一下近期公司的出库量的情况",
    "帮我找找最近市场上的原油报价",
  ];

  return (
    <div className="recommendations">
      {recommendations.map((text, index) => (
        <Card key={index} onClick={() => handleRecommendationClick(text)}>
          {text}
        </Card>
      ))}
    </div>
  );
};

const EVGPT = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (input.trim() === "") return;

    const newMessage = {
      id: messages.length,
      text: input,
      sender: "user",
    };

    setMessages([...messages, newMessage]);
    setInput("");

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const ChatArea = () => {
    return (
      <>
        <Card.Body className="chat-body">
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.sender}`}>
              <span>{msg.text}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </Card.Body>
      </>
    );
  };

  return (
    <>
      <Container fluid>
        {messages.length === 0 ? (
          <RecommendedQuestions
            handleRecommendationClick={handleRecommendationClick}
          />
        ) : (
          <ChatArea style={{ height: 1500 }} />
        )}
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="d-flex chat-input"
        >
          <Form.Control
            type="text"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="mr-2"
          />
          <Button variant="primary" type="submit">
            Send
          </Button>
        </Form>
      </Container>
      <AdminFooter />
    </>
  );
};

function AdminFooter() {
  return (
    <>
      <footer className="footer">
        <Container fluid className="pl-4 ml-2">
          <nav>
            <ul className="footer-menu">
              <li>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  Home
                </a>
              </li>
              <li>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  Company
                </a>
              </li>
              <li>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  Blog
                </a>
              </li>
            </ul>
            <p className="copyright text-center">
              © <script>document.write(new Date().getFullYear())</script>
              <a href="http://www.creative-tim.com">
                2024广州市天秤文化科技有限公司
              </a>
              Evrald数据库
            </p>
          </nav>
        </Container>
      </footer>
    </>
  );
}

export default EVGPT;
