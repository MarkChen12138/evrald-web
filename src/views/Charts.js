import React from "react";
// react component used to create charts
import ChartistGraph from "react-chartist";
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
import { useState, useEffect } from "react";

function Charts() {
  const [transactions, setTransactions] = useState([]);
  const [productId, setProductId] = useState(0);
  const [productInfo, setProductInfo] = useState([]); // 产品信息
  const [loading, setLoading] = useState(false);

  //fetch company products
  useEffect(() => {
    const fetchCompanyProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://findcompanies-kyxhiocbqa.cn-zhangjiakou.fcapp.run?productId=0" // 获取公司产品的API
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setProductInfo(jsonData);
        console.log("Product Info:", productInfo);
      } catch (error) {
        console.error("Failed to fetch company products:", error);
        setProductInfo([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyProducts();
  }, []);

  //fetch company data for specific product
  useEffect(() => {
    async function fetchCompanies() {
      setLoading(true); // 开始加载数据
      try {
        const response = await fetch(
          `https://findcompanies-kyxhiocbqa.cn-zhangjiakou.fcapp.run?productId=${productId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setTransactions(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    }
    fetchCompanies();
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const ProfitGroupedByMonth = () => {
    const groupByMonth = (transactions) => {
      const grouped = {};
      transactions.forEach((t) => {
        const date = new Date(t.DeliveryDate);
        const month = `${date.getFullYear()}-${date.getMonth() + 1}`;

        if (!grouped[month]) {
          grouped[month] = {
            PurchasePrice: 0,
            SalePrice: 0,
            Profit: 0,
            count: 0,
          };
        }
        grouped[month].Profit +=
          (t.SalePrice - t.PurchasePrice) * t.ShippedQuantity;
        grouped[month].count += 1;
      });

      return grouped;
    };

    const groupedTransactions = groupByMonth(transactions);

    const months = Object.keys(groupedTransactions);
    const profits = Object.values(groupedTransactions).map(
      (g) => g.Profit / 10000
    );

    const data = {
      labels: months,
      series: [profits],
    };

    const options = {
      showArea: false,
      height: "245px",
      axisX: {
        showGrid: true,
        showLabel: true,
      },
      axisY: {
        labelInterpolationFnc: (value) => `${value}`,
        showGrid: true,
        showLabel: true,
      },
    };

    const responsiveOptions = [
      [
        "screen and (max-width: 640px)",
        {
          axisX: {
            labelInterpolationFnc: (value, index) =>
              index % 5 === 0 ? value : null,
          },
        },
      ],
      [
        "screen and (min-width: 641px)",
        {
          axisX: {
            labelInterpolationFnc: (value, index) =>
              index % 3 === 0 ? value : null,
          },
        },
      ],
    ];

    return (
      <Card>
        <Card.Header>
          <Card.Title as="h4">最近交易利润分析（万元/每月）</Card.Title>
          <p className="card-category">基于历史的交易记录</p>
        </Card.Header>
        <Card.Body>
          <ChartistGraph
            type="Line"
            data={data}
            options={options}
            responsiveOptions={responsiveOptions}
          />
        </Card.Body>
      </Card>
    );
  };

  const TradingShareGroupedByHalfYear = () => {
    const groupByHalfYear = (transactions) => {
      const grouped = {};
      transactions.forEach((t) => {
        const date = new Date(t.DeliveryDate);
        const halfYear = `${date.getFullYear()}-${
          date.getMonth() < 6 ? "1" : "2"
        }`;

        if (!grouped[halfYear]) {
          grouped[halfYear] = {
            PurchasePrice: 0,
            SalePrice: 0,
            Profit: 0,
            count: 0,
          };
        }
        grouped[halfYear].Profit +=
          (t.SalePrice - t.PurchasePrice) * t.ShippedQuantity;
        grouped[halfYear].count += 1;
      });

      return grouped;
    };

    const groupedTransactions = groupByHalfYear(transactions);

    const halfYears = Object.keys(groupedTransactions);
    const profits = Object.values(groupedTransactions).map(
      (g) => g.Profit / 10000
    );

    const data = {
      labels: halfYears,
      series: [profits],
    };

    const options = {
      showArea: false,
      height: "245px",
      axisX: {
        showGrid: true,
        showLabel: true,
      },
      axisY: {
        labelInterpolationFnc: (value) => `${value}`,
        showGrid: true,
        showLabel: true,
      },
    };

    const responsiveOptions = [
      [
        "screen and (max-width: 640px)",
        {
          axisX: {
            labelInterpolationFnc: (value, index) =>
              index % 5 === 0 ? value : null,
          },
        },
      ],
      [
        "screen and (min-width: 641px)",
        {
          axisX: {
            labelInterpolationFnc: (value, index) =>
              index % 3 === 0 ? value : null,
          },
        },
      ],
    ];

    return (
      <Card>
        <Card.Header>
          <Card.Title as="h4">销量总额占比</Card.Title>
          <p className="card-category">基于最近6个月的贸易量总和</p>
        </Card.Header>
        <Card.Body>
          <ChartistGraph
            type="Pie"
            data={{
              labels: ["62%", "32%", "6%"],
              series: [62, 32, 6],
            }}
          />
        </Card.Body>
        <Card.Footer>
          <div className="legend">
            <i className="fas fa-circle text-info"></i>
            常青实业 <i className="fas fa-circle text-danger"></i>
            东方油 <i className="fas fa-circle text-warning"></i>
            山东天弘
          </div>
          <hr></hr>
          <div className="stats">
            <i className="far fa-clock-o"></i>
            交易量由Evrald交易链条提供
          </div>
        </Card.Footer>
      </Card>
    );
  };

  return (
    <>
      <p>Filter by Product ID:</p>
      <select onChange={(e) => setProductId(e.target.value)}>
        {productInfo.map((product, index) => (
          <option key={index} value={product.ProductID}>
            {product.ProductName}
          </option>
        ))}
      </select>

      <>
        <Container fluid>
          <Row>
            <Col md="6">
              <ProfitGroupedByMonth />
            </Col>
            <Col md="6">
              <TradingShareGroupedByHalfYear />
            </Col>
          </Row>
          {/* <Col md="6">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">NASDAQ: AAPL</Card.Title>
                  <p className="card-category">Line Chart with Points</p>
                </Card.Header>
                <Card.Body>
                  <ChartistGraph
                    type="Line"
                    data={{
                      labels: [
                        "'07",
                        "'08",
                        "'09",
                        "'10",
                        "'11",
                        "'12",
                        "'13",
                        "'14",
                        "'15",
                      ],
                      series: [
                        [
                          22.2, 34.9, 42.28, 51.93, 62.21, 80.23, 82.12, 102.5,
                          107.23,
                        ],
                      ],
                    }}
                    options={{
                      lineSmooth: false,
                      height: "260px",
                      axisY: {
                        offset: 40,
                        labelInterpolationFnc: function (value) {
                          return "$" + value;
                        },
                      },
                      low: 10,
                      high: 110,
                      classNames: {
                        point: "ct-point ct-green",
                        line: "ct-line ct-green",
                      },
                      chartPadding: {
                        right: -25,
                      },
                    }}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">User Behavior</Card.Title>
                  <p className="card-category">Multiple Lines Charts</p>
                </Card.Header>
                <Card.Body>
                  <ChartistGraph
                    type="Line"
                    data={{
                      labels: [
                        "'06",
                        "'07",
                        "'08",
                        "'09",
                        "'10",
                        "'11",
                        "'12",
                        "'13",
                        "'14",
                        "'15",
                      ],
                      series: [
                        [287, 385, 490, 554, 586, 698, 752, 788, 846, 944],
                        [67, 152, 143, 287, 335, 435, 539, 542, 544, 647],
                        [23, 113, 67, 190, 239, 307, 308, 410, 410, 509],
                      ],
                    }}
                    options={{
                      low: 0,
                      high: 1000,
                      showArea: false,
                      height: "245px",
                      axisX: {
                        showGrid: true,
                      },
                      lineSmooth: true,
                      showLine: true,
                      showPoint: true,
                      chartPadding: {
                        right: -25,
                      },
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </Card.Body>
                <Card.Footer>
                  <div className="legend">
                    <i className="fas fa-circle text-info"></i>
                    Open <i className="fas fa-circle text-danger"></i>
                    Click <i className="fas fa-circle text-warning"></i>
                    Click Second Time
                  </div>
                  <hr></hr>
                  <div className="stats">
                    <i className="fas fa-history"></i>
                    Updated 3 minutes ago
                  </div>
                </Card.Footer>
              </Card>
            </Col>
            <Col md="6"></Col>
          </Row>
          <Row> */}
          {/* <Col md="6">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">Views</Card.Title>
                  <p className="card-category">Bar Chart</p>
                </Card.Header>
                <Card.Body>
                  <ChartistGraph
                    type="Bar"
                    data={{
                      labels: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "Mai",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ],
                      series: [
                        [
                          542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756,
                          895,
                        ],
                      ],
                    }}
                    options={{
                      seriesBarDistance: 10,
                      classNames: {
                        bar: "ct-bar ct-azure",
                      },
                      axisX: {
                        showGrid: false,
                      },
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          seriesBarDistance: 5,
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col md="6">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">Activity</Card.Title>
                  <p className="card-category">Multiple Bars Chart</p>
                </Card.Header>
                <Card.Body>
                  <ChartistGraph
                    type="Bar"
                    data={{
                      labels: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "Mai",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ],
                      series: [
                        [
                          542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756,
                          895,
                        ],
                        [
                          412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636,
                          695,
                        ],
                      ],
                    }}
                    options={{
                      seriesBarDistance: 10,
                      axisX: {
                        showGrid: false,
                      },
                      height: "245px",
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          seriesBarDistance: 5,
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </Card.Body>
              </Card>
            </Col> */}
        </Container>
      </>
    </>
  );
}

export default Charts;
