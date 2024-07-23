import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useHistory, Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import CompanyDetail from "./CompanyDetail";

function Database({ match }) {
  const [companyInfo, setCompanyInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  const handleCardClick = (id) => {
    history.push(`${match.url}/company/${id}`);
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch(
          `https://findcompanies-kyxhiocbqa.cn-zhangjiakou.fcapp.run?productId=0&companyId=-1`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        console.log("Fetched Company Info:", jsonData);
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

  const AllCompanyInfos = () => {
    return companyInfo.map((company) => (
      <Col sm="4" key={company.CompanyID}>
        <Card onClick={() => handleCardClick(company.CompanyID)}>
          <Card.Img src={require("assets/img/blog-1.jpg")}></Card.Img>
          <Card.Body className="text-center">
            <code>{company.CompanyName}</code>
          </Card.Body>
        </Card>
      </Col>
    ));
  };

  return (
    <Container fluid>
      <Switch>
        <Route
          exact
          path={match.path}
          render={() => (
            <Row>
              {isLoading ? (
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              ) : (
                <AllCompanyInfos />
              )}
            </Row>
          )}
        />
        <Route path={`${match.path}/company/:id`} component={CompanyDetail} />
      </Switch>
    </Container>
  );
}

export default Database;
