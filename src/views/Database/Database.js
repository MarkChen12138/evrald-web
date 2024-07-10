import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom"; // 导入 useHistory 钩子
import { useState, useEffect } from "react";

function Database() {
  const history = useHistory(); // 使用 useHistory 钩子获取 history 实例
  const [companyInfo, setCompanyInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleCardClick = (id) => {
    console.log(id);
    history.push(`/admin/company/${id}`); // 使用传入的公司 id 导航到公司详情页
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch(
          `https://findcompanies-kyxhiocbqa.cn-zhangjiakou.fcapp.run?productId=0&companyId=-1` // 获取公司产品的API
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        console.log("Fetched Company Info:", jsonData); // 记录获取到的数据
        setCompanyInfo(jsonData);
      } catch (error) {
        console.error("Failed to fetch company products:", error);
        setCompanyInfo([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <Container fluid>
      <Row>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          companyInfo.map((company) => (
            <Col sm="4" key={company.CompanyID}>
              <Card onClick={() => handleCardClick(company.CompanyID)}>
                <Card.Img src={require("assets/img/blog-1.jpg")}></Card.Img>
                <Card.Body className="text-center">
                  <code>{company.CompanyName}</code>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default Database;
