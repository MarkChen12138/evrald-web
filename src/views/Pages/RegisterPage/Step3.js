import React, { useState } from "react";
import {
  Row,
  Col,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
} from "react-bootstrap";
import Select from "react-select";

const Step2 = React.forwardRef((props, ref) => {
  const [identityType, setIdentityType] = useState("ENTERPRISE");
  const [isFinancialOrg, setIsFinancialOrg] = useState("NO"); // 初始设置为"NO"
  const [financialOrgType, setFinancialOrgType] = useState("");
  const [financialOrgCertImg, setFinancialOrgCertImg] = useState("");

  const identityOptions = [
    { value: "ENTERPRISE", label: "企业" },
    { value: "IND_BIZ", label: "个体工商户" },
    { value: "INST", label: "事业单位" },
    { value: "GOV", label: "党政机关" },
    { value: "ORG", label: "社会组织" },
    { value: "MSE", label: "小微商户" },
  ];

  const financialTypes = [
    { value: "BANK", label: "银行" },
    { value: "PAYMENT", label: "支付机构" },
    { value: "INSURANCE", label: "保险公司" },
  ];

  const yesNoOptions = [
    { value: "YES", label: "是" },
    { value: "NO", label: "否" },
  ];

  const generateJson = () => {
    const authIdentityInfo = {
      identity_type: identityType,
      is_financial_org: isFinancialOrg === "YES",
      ...(isFinancialOrg === "YES" && {
        financial_org_info: {
          financial_org_type: financialOrgType,
          financial_org_cert_img: [financialOrgCertImg],
        },
      }),
    };

    console.log(
      "Generated JSON:",
      JSON.stringify({ auth_identity_info: authIdentityInfo }, null, 2)
    );
  };

  return (
    <div className="wizard-step" ref={ref}>
      <p className="text-center">
        Please tell us more about your organization.
      </p>
      <Row>
        <Col md={6}>
          <FormGroup>
            <FormLabel>主体类型</FormLabel>
            <Select
              name="identityType"
              value={identityOptions.find(
                (option) => option.value === identityType
              )}
              options={identityOptions}
              onChange={(option) => setIdentityType(option.value)}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <FormLabel>是否金融机构</FormLabel>
            <Select
              name="isFinancialOrg"
              value={yesNoOptions.find(
                (option) => option.value === isFinancialOrg
              )}
              options={yesNoOptions}
              onChange={(option) => setIsFinancialOrg(option.value)}
            />
          </FormGroup>
        </Col>
      </Row>
      {isFinancialOrg === "YES" && (
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>金融机构类型</FormLabel>
              <Select
                name="financialOrgType"
                value={financialTypes.find(
                  (type) => type.value === financialOrgType
                )}
                options={financialTypes}
                onChange={(option) => setFinancialOrgType(option.value)}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <FormLabel>金融机构证书图片</FormLabel>
              <FormControl
                type="text"
                placeholder="请输入图片链接"
                value={financialOrgCertImg}
                onChange={(e) => setFinancialOrgCertImg(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
      )}
      <Button onClick={generateJson}>生成 JSON</Button>
    </div>
  );
});

export default Step2;
