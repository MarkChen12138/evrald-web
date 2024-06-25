import React from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import { companies } from "./CompaniesForDisplay";

const CompanyDetail = () => {
  const { id } = useParams();
  const company = companies.find((c) => c.CompanyID === parseInt(id));

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>{company.CompanyName}的详细信息</Card.Title>
              <Card.Text>
                {company.Description || "暂无更多描述信息。"}
              </Card.Text>
              <Button variant="primary">更多信息</Button>
            </Card.Body>
          </Card>
          <Card className="mt-3">
            <Card.Header>公司活动</Card.Header>
            <ListGroup variant="flush">
              {company.Products.map((event, index) => (
                <ListGroup.Item key={index}>
                  {event.name} - {event.date}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>人员规模: {company.Employees}</ListGroup.Item>
            <ListGroup.Item>
              最近上传: {company.LatestContractDate}
            </ListGroup.Item>
            <ListGroup.Item>合同数量: {company.ContractSum}</ListGroup.Item>
          </ListGroup>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>公司地理位置</Card.Title>
              {/* 地图占位符或实际地图组件 */}
              <div style={{ height: "200px", backgroundColor: "#eee" }}>
                地图位置
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CompanyDetail;
