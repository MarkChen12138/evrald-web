const companies = [
  {
    CompanyID: 101,
    CompanyName: "Global Energy Ltd",
    Products: [201, 202, 203],
    Employees: "100-500",
    LatestContractDate: "2024-07-20",
    ContractSum: 2,
    Description: "全球领先的创新能源解决方案提供商。",
    Score: 92,
  },
  {
    CompanyID: 102,
    CompanyName: "Petroleum Corp.",
    Products: [202, 204],
    Employees: "500-1000",
    LatestContractDate: "2024-08-01",
    ContractSum: 3,
    Description: "专注于石油和天然气的勘探与生产。",

    Score: 88,
  },
  {
    CompanyID: 103,
    CompanyName: "Oil & Gas Co.",
    Products: [205, 206, 207],
    Employees: "250-750",
    LatestContractDate: "2024-09-10",
    ContractSum: 1,
    Description: "一家提供石油产品和服务的成立能源公司。",

    Score: 85,
  },
  {
    CompanyID: 104,
    CompanyName: "Green Energy Solutions",
    Products: [208, 209],
    Employees: "150-300",
    LatestContractDate: "2024-10-15",
    ContractSum: 2,
    Description:
      "Focuses on renewable energy technologies and eco-friendly solutions.",
    Score: 90,
  },
  {
    CompanyID: 105,
    CompanyName: "Bluewave Oils",
    Products: [201, 203, 204, 205],
    Employees: "300-600",
    LatestContractDate: "2024-11-20",
    ContractSum: 4,
    Description: "高质量精炼油和润滑油的领先供应商。",
    Score: 93,
  },
];

const productSpecs = [
  { ProductSpecID: 201, ProductName: "Crude Oil - Light Sweet" },
  { ProductSpecID: 202, ProductName: "Crude Oil - Heavy Sour" },
  { ProductSpecID: 203, ProductName: "Refined Gasoline" },
  { ProductSpecID: 204, ProductName: "Diesel" },
  { ProductSpecID: 205, ProductName: "Natural Gas" },
  { ProductSpecID: 206, ProductName: "Biofuel" },
  { ProductSpecID: 207, ProductName: "Ethanol" },
  { ProductSpecID: 208, ProductName: "Propane" },
  { ProductSpecID: 209, ProductName: "Butane" },
];

const contracts = [
  {
    ContractID: 301,
    ContractMonth: 5,
    ContractDate: "2024-05-01",
    SalesUnitID: 101,
    PurchaseUnitID: 102,
  },
  {
    ContractID: 302,
    ContractMonth: 5,
    ContractDate: "2024-05-02",
    SalesUnitID: 103,
    PurchaseUnitID: 104,
  },
  {
    ContractID: 303,
    ContractMonth: 6,
    ContractDate: "2024-06-15",
    SalesUnitID: 102,
    PurchaseUnitID: 105,
  },
  {
    ContractID: 304,
    ContractMonth: 7,
    ContractDate: "2024-07-20",
    SalesUnitID: 101,
    PurchaseUnitID: 103,
  },
  {
    ContractID: 305,
    ContractMonth: 7,
    ContractDate: "2024-07-22",
    SalesUnitID: 104,
    PurchaseUnitID: 105,
  },
];

const transactions = [
  {
    TransactionID: 401,
    ProductSpecID: 201,
    DeliveryDate: "2024-07-05",
    ContractQuantity: 1000,
    ContractRemaining: 500,
    ShippedQuantity: 500.0,
    ReceivedQuantity: 499.95,
    ShipName: "Ship A",
    LoadingAddress: "Port Houston",
    SalePrice: 42.5,
    PurchasePrice: 40.0,
  },
  {
    TransactionID: 402,
    ProductSpecID: 202,
    DeliveryDate: "2024-08-01",
    ContractQuantity: 2000,
    ContractRemaining: 2000,
    ShippedQuantity: 0.0,
    ReceivedQuantity: 0.0,
    ShipName: "Ship B",
    LoadingAddress: "Port Galveston",
    SalePrice: 39.0,
    PurchasePrice: 37.5,
  },
  {
    TransactionID: 403,
    ProductSpecID: 203,
    DeliveryDate: "2024-09-10",
    ContractQuantity: 1500,
    ContractRemaining: 750,
    ShippedQuantity: 750.0,
    ReceivedQuantity: 749.88,
    ShipName: "Ship C",
    LoadingAddress: "Port Miami",
    SalePrice: 48.0,
    PurchasePrice: 45.5,
  },
  {
    TransactionID: 404,
    ProductSpecID: 204,
    DeliveryDate: "2024-10-15",
    ContractQuantity: 1800,
    ContractRemaining: 900,
    ShippedQuantity: 900.0,
    ReceivedQuantity: 899.9,
    ShipName: "Ship D",
    LoadingAddress: "Port Vancouver",
    SalePrice: 50.0,
    PurchasePrice: 47.0,
  },
  {
    TransactionID: 405,
    ProductSpecID: 205,
    DeliveryDate: "2024-11-20",
    ContractQuantity: 2200,
    ContractRemaining: 2200,
    ShippedQuantity: 0.0,
    ReceivedQuantity: 0.0,
    ShipName: "Ship E",
    LoadingAddress: "Port New Orleans",
    SalePrice: 36.0,
    PurchasePrice: 34.5,
  },
];

const contractTransactions = [
  { ContractID: 301, TransactionID: 401 },
  { ContractID: 302, TransactionID: 402 },
  { ContractID: 303, TransactionID: 403 },
  { ContractID: 304, TransactionID: 404 },
  { ContractID: 305, TransactionID: 405 },
];

export {
  companies,
  productSpecs,
  contracts,
  transactions,
  contractTransactions,
};
