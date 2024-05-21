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

const Step3 = React.forwardRef((props, ref) => {
  const [identityType, setIdentityType] = useState("ENTERPRISE");
  const [isFinancialOrg, setIsFinancialOrg] = useState(false);
  const [financialOrgType, setFinancialOrgType] = useState("");
  const [financialOrgCertImg, setFinancialOrgCertImg] = useState("");
  const [financialOrgCertImages, setFinancialOrgCertImages] = useState([]);
  const [certificateType, setCertificateType] = useState("");
  const [certType, setCertType] = useState("");
  const [certNo, setCertNo] = useState("");
  const [certImage, setCertImage] = useState("");
  const [merchantName, setMerchantName] = useState("");
  const [legalPersonName, setLegalPersonName] = useState("");
  const [registerAddress, setRegisterAddress] = useState("");
  const [effectTime, setEffectTime] = useState("");
  const [expireTime, setExpireTime] = useState("");

  const identityOptions = [
    { value: "ENTERPRISE", label: "企业" },
    { value: "IND_BIZ", label: "个体工商户" },
    { value: "INST", label: "事业单位" },
    { value: "GOV", label: "党政机关" },
    { value: "ORG", label: "社会组织" },
    { value: "MSE", label: "小微商户" },
  ];

  const financialTypes = [
    { value: "BANK", label: "银行业" },
    { value: "PAYMENT", label: "支付机构" },
    { value: "INSURANCE", label: "保险业" },
    { value: "SETTLE", label: "交易及结算类金融机构" },
    { value: "OTHER", label: "其他" },
  ];

  const binaryOptions = [
    { value: true, label: "是" },
    { value: false, label: "否" },
  ];

  const certificateTypes = [
    { value: "BUSINESS_CERT", label: "营业执照" },
    { value: "REGISTER_CERT", label: "登记证书" },
  ];

  const certTypes = [
    { value: "UNIT_SOCIAL_CREDIT", label: "统一社会信用代码证书" },
    { value: "CHARITY_ORG_SOLICIT", label: "慈善组织公开募捐资格证书" },
    { value: "SOCIAL_ORG_LEGAL", label: "社会团体法人登记证书" },
    { value: "CIVIL_UN_ENT", label: "民办非企业单位登记证书" },
    { value: "FOUNDATION_LEGAL_PERSON", label: "基金会法人登记证书" },
    { value: "FARMERS_COOPERATE", label: "农民专业合作社法人营业执照" },
    { value: "RELIGION_PLACES", label: "宗教活动场所登记证" },
    { value: "OTHER_REG_CERT", label: "其他证书/批文/证明" },
  ];

  const requiredTypes = ["ENTERPRISE", "IND_BIZ", "GOV", "INST", "ORG"];

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files) {
      setFinancialOrgCertImages([...files]);
    }
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
            <FormLabel>是否为金融机构</FormLabel>
            <Select
              name="isFinancialOrg"
              value={binaryOptions.find(
                (option) => option.value === isFinancialOrg
              )}
              options={binaryOptions}
              onChange={(option) => setIsFinancialOrg(option.value)}
              placeholder="选择是否为金融机构"
            />
          </FormGroup>
        </Col>
      </Row>
      {isFinancialOrg && (
        <>
          {" "}
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
          <FormGroup>
            <FormLabel>金融机构许可证图片（最多五张）</FormLabel>
            <FormControl
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
            />
            {financialOrgCertImages.length > 0 && (
              <div style={{ marginTop: "10px" }}>
                {Array.from(financialOrgCertImages).map((file, index) => (
                  <div key={index}>{file.name}</div>
                ))}
              </div>
            )}
          </FormGroup>
        </>
      )}
      {requiredTypes.includes(identityType) && (
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>证件信息</FormLabel>
              <Select
                name="certificateType"
                value={certificateTypes.find(
                  (type) => type.value === certificateType
                )}
                options={certificateTypes}
                onChange={(option) => setCertificateType(option.value)}
              />
            </FormGroup>
          </Col>
          {certificateType === "BUSINESS_CERT" && (
            <Col md={6}>
              <FormGroup>
                <FormLabel>证照类型</FormLabel>
                <Select
                  name="certType"
                  value={certTypes.find((type) => type.value === certType)}
                  options={certTypes}
                  onChange={(option) => setCertType(option.value)}
                />
              </FormGroup>
            </Col>
          )}
          <Col md={6}>
            <FormGroup>
              <FormLabel>证件编号</FormLabel>
              <FormControl
                type="text"
                placeholder="请输入证件编号"
                value={certNo}
                onChange={(e) => setCertNo(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <FormLabel>证照图片</FormLabel>
              <FormControl
                type="file"
                placeholder="请输入图片链接"
                value={certImage}
                onChange={(e) => setCertImage(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <FormLabel>证照商户名称</FormLabel>
              <FormControl
                type="text"
                placeholder="请输入商户名称"
                value={merchantName}
                onChange={(e) => setMerchantName(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <FormLabel>法人姓名</FormLabel>
              <FormControl
                type="text"
                placeholder="请输入法人姓名"
                value={legalPersonName}
                onChange={(e) => setLegalPersonName(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <FormLabel>注册地址</FormLabel>
              <FormControl
                type="text"
                placeholder="请输入注册地址"
                value={registerAddress}
                onChange={(e) => setRegisterAddress(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <FormLabel>证照生效时间</FormLabel>
              <FormControl
                type="date"
                value={effectTime}
                onChange={(e) => setEffectTime(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <FormLabel>证照过期时间</FormLabel>
              <FormControl
                type="date"
                value={expireTime}
                onChange={(e) => setExpireTime(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
      )}
    </div>
  );
});

function FinancialOrgForm(props, ref) {
  const [identityType, setIdentityType] = useState("");
  const [isFinancialOrg, setIsFinancialOrg] = useState(false);

  const identityOptions = [
    // Add your options for identity type here
  ];
  const binaryOptions = [
    { value: true, label: "是" },
    { value: false, label: "否" },
  ];

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
            <FormLabel>是否为金融机构</FormLabel>
            <Select
              name="isFinancialOrg"
              value={binaryOptions.find(
                (option) => option.value === isFinancialOrg
              )}
              options={binaryOptions}
              onChange={(option) => setIsFinancialOrg(option.value)}
              placeholder="选择是否为金融机构"
            />
          </FormGroup>
        </Col>
        {isFinancialOrg && <React.Fragment></React.Fragment>}
      </Row>
    </div>
  );
}

export default Step3;
