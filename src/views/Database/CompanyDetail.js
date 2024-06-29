import React from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  ListGroup,
  Table,
} from "react-bootstrap";
import { companies, transactions } from "./CompaniesForDisplay";

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
          <Card>
            {" "}
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Table on Plain Background</Card.Title>
                <p className="card-category">
                  Here is a subtitle for this table
                </p>
              </Card.Header>
              <Card.Body className="table-responsive p-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th>合同名称</th>
                      <th>交货时间</th>
                      <th>产品名称</th>
                      <th>发出货量</th>
                      <th>收货地址</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((t) => (
                      <tr>
                        <td>合同名称</td>
                        <td>{t.DeliveryDate}</td>
                        <td>{t.ProductSpecID}</td>
                        <td>{t.ShippedQuantity}</td>
                        <td>{t.LoadingAddress}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
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
