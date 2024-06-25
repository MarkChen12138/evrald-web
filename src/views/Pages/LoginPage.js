import React from "react";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";

function LoginPage() {
  const [cardClasses, setCardClasses] = React.useState("card-hidden");
  React.useEffect(() => {
    setTimeout(() => {
      setCardClasses("");
    }, 700);
  });

  return (
    <Container
      fluid
      className="min-vh-100 d-flex align-items-center p-0"
      style={{ backgroundColor: "#fff000" }}
    >
      <Row className="g-0 w-100">
        <Col lg={6} md={6} className="d-none d-md-block">
          <h1 className="text-center">商品行业智能领先数据库</h1>
          <h5 className="text-center">
            智能化登记所有数据，利用区块链技术固证，让所有数据可溯源，不可篡改，安全且高效。
          </h5>
          <h5 className="text-center">信任，从未如此简单</h5>
          <div
            className="h-100"
            style={{
              backgroundImage: `url(${require("assets/img/login.svg")})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </Col>
        <Col
          lg={6}
          md={6}
          className="mx-auto"
          style={{ backgroundColor: "#fff000" }}
        >
          <Container>
            <Row>
              <Col className="mx-auto" xl="6" lg="8" md="12">
                <Form className="form" method="">
                  <Card className={`card-login ${cardClasses}`}>
                    <Card.Header>
                      <h3 className="header text-center">Login</h3>
                    </Card.Header>
                    <Card.Body>
                      <Form.Group>
                        <label>手机号/邮箱</label>
                        <Form.Control placeholder="手机号/邮箱" type="text" />
                      </Form.Group>
                      <Form.Group>
                        <label>密码</label>
                        <Form.Control placeholder="密码" type="password" />
                      </Form.Group>
                      <Form.Check className="pl-0">
                        <Form.Check.Label>
                          <Form.Check.Input defaultChecked type="checkbox" />
                          <span className="form-check-sign"></span>
                          Subscribe to newsletter
                        </Form.Check.Label>
                      </Form.Check>
                    </Card.Body>
                    <Card.Footer className="ml-auto mr-auto">
                      <Button
                        className="btn-wd"
                        type="submit"
                        variant="warning"
                      >
                        Login
                      </Button>
                    </Card.Footer>
                  </Card>
                </Form>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
