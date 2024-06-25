import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom"; // 导入 useHistory 钩子
import { companies, productSpecs } from "./CompaniesForDisplay";

function Database() {
  const history = useHistory(); // 使用 useHistory 钩子获取 history 实例

  const handleCardClick = (id) => {
    console.log(id);
    history.push(`/admin/company/${id}`); // 使用传入的公司 id 导航到公司详情页
  };

  return (
    <Container fluid>
      <Row>
        {companies.map((company) => (
          <Col sm="4" key={company.CompanyID}>
            <Card onClick={() => handleCardClick(company.CompanyID)}>
              <Card.Img src={require("assets/img/blog-1.jpg")}></Card.Img>
              <Card.Body className="text-center">
                <code>{company.CompanyName}</code>
                <div>
                  {company.Products.map((id, index) => (
                    <h6 key={index}>
                      {productSpecs.find((p) => p.ProductSpecID === id)
                        ?.ProductName || "Product not found"}
                    </h6>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Database;
