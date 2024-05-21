import React, { useState } from "react";
import {
  Row,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
  Col,
} from "react-bootstrap";
import Select from "react-select";

const Step3 = React.forwardRef((props, ref) => {
  const [identityType, setIdentityType] = useState("ENTERPRISE");
  const [isFinancialOrg, setIsFinancialOrg] = useState(false);
  const [financialOrgType, setFinancialOrgType] = useState("");
  const [financialOrgCertImg, setFinancialOrgCertImg] = useState("");
  const [financialOrgCertImagesName, setFinancialOrgCertImagesName] = useState(
    []
  );
  const [certificateType, setCertificateType] = useState("");
  const [certType, setCertType] = useState("");
  const [certNo, setCertNo] = useState("");
  const [certImage, setCertImage] = useState([]);
  const [merchantName, setMerchantName] = useState("");
  const [legalPersonName, setLegalPersonName] = useState("");
  const [registerAddress, setRegisterAddress] = useState("");
  const [effectTime, setEffectTime] = useState("");
  const [expireTime, setExpireTime] = useState("");
  const [requiredEmployerLetter, setRequiredEmployerLetter] = useState("");
  const [merchantType, setMerchantType] = useState("");
  const [storeName, setStoreName] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [storeDoorImg, setStoreDoorImg] = useState([]);
  const [storeInnerImg, setStoreInnerImg] = useState([]);

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

  const handleInputSave = () => {
    const authIdentityInfo = {
      identity_type: identityType,
      is_financial_org: isFinancialOrg,
    };
    if (isFinancialOrg) {
      authIdentityInfo.financial_org_info = {
        financial_org_type: financialOrgType,
        financial_org_cert_img: financialOrgCertImagesName,
      };
    }
    authIdentityInfo.certificate_type = certificateType;
    if (
      certType !== "" &&
      certNo !== "" &&
      certImage !== "" &&
      merchantName !== "" &&
      legalPersonName !== "" &&
      registerAddress !== "" &&
      effectTime !== "" &&
      expireTime !== ""
    ) {
      authIdentityInfo.certificate_info = {
        cert_type: certType,
        cert_no: certNo,
        cert_image: certImage,
        merchant_name: merchantName,
        legal_person_name: legalPersonName,
        register_address: registerAddress,
        effect_time: effectTime,
        expire_time: expireTime,
      };
    }
    if (requiredEmployerLetter !== "") {
      authIdentityInfo.employer_letter = requiredEmployerLetter;
    }
    if (identityType === "MSE") {
      authIdentityInfo.merchant_info = {
        merchant_type: merchantType,
        store_name: storeName,
        province: province,
        city: city,
        district: district,
        store_address: storeAddress,
        store_door_img: storeDoorImg,
        store_inner_img: storeInnerImg,
      };
    }
    props.updateStep3Data(authIdentityInfo);
  };

  const requiredCertificateTypes = [
    "ENTERPRISE",
    "IND_BIZ",
    "GOV",
    "INST",
    "ORG",
  ];

  const requiredEmployerLetterTypes = ["GOV", "INST"];

  const handleFinancialOrgCertImagesNameChange = (event) => {
    const files = event.target.files;
    if (files) {
      const filenames = Array.from(files).map((file) => file.name);
      console.log(filenames);
      setFinancialOrgCertImagesName(filenames);
    } else {
      setFinancialOrgCertImagesName([]);
    }
  };

  const handleCertImageChange = (event) => {
    const files = event.target.files;
    if (files) {
      const filenames = Array.from(files).map((file) => file.name);
      console.log(filenames);
      setCertImage(filenames);
    } else {
      setCertImage([]);
    }
    handleInputSave();
  };

  return (
    <div className="wizard-step" ref={ref}>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <p className="text-center">
            Please tell us more about your organization.
          </p>
          <FormGroup>
            <FormLabel>主体类型</FormLabel>
            <Select
              name="identityType"
              value={identityOptions.find(
                (option) => option.value === identityType
              )}
              options={identityOptions}
              onChange={(option) => setIdentityType(option.value)}
              onBlur={handleInputSave}
            />
          </FormGroup>
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
              onBlur={handleInputSave}
            />
          </FormGroup>
          {isFinancialOrg && (
            <>
              <FormGroup>
                <FormLabel>金融机构类型</FormLabel>
                <Select
                  name="financialOrgType"
                  value={financialTypes.find(
                    (type) => type.value === financialOrgType
                  )}
                  options={financialTypes}
                  onChange={(option) => setFinancialOrgType(option.value)}
                  onBlur={handleInputSave}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>金融机构许可证图片（最多五张）</FormLabel>
                <FormControl
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFinancialOrgCertImagesNameChange}
                  onBlur={handleInputSave}
                />
              </FormGroup>
            </>
          )}
          {requiredCertificateTypes.includes(identityType) && (
            <>
              <FormGroup>
                <FormLabel>证件信息</FormLabel>
                <Select
                  name="certificateType"
                  value={certificateTypes.find(
                    (type) => type.value === certificateType
                  )}
                  options={certificateTypes}
                  onChange={(option) => setCertificateType(option.value)}
                  onBlur={handleInputSave}
                />
              </FormGroup>
              {certificateType === "BUSINESS_CERT" && (
                <FormGroup>
                  <FormLabel>证照类型</FormLabel>
                  <Select
                    name="certType"
                    value={certTypes.find((type) => type.value === certType)}
                    options={certTypes}
                    onChange={(option) => setCertType(option.value)}
                    onBlur={handleInputSave}
                  />
                </FormGroup>
              )}
              <FormGroup>
                <FormLabel>证件编号</FormLabel>
                <FormControl
                  type="text"
                  placeholder="请输入证件编号"
                  value={certNo}
                  onChange={(e) => setCertNo(e.target.value)}
                  onBlur={handleInputSave}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>证照图片</FormLabel>
                <FormControl
                  type="file"
                  multiple
                  placeholder="请输入图片链接"
                  onChange={handleCertImageChange}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>证照商户名称</FormLabel>
                <FormControl
                  type="text"
                  placeholder="请输入商户名称"
                  value={merchantName}
                  onChange={(e) => setMerchantName(e.target.value)}
                  onBlur={handleInputSave}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>法人姓名</FormLabel>
                <FormControl
                  type="text"
                  placeholder="请输入法人姓名"
                  value={legalPersonName}
                  onChange={(e) => setLegalPersonName(e.target.value)}
                  onBlur={handleInputSave}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>注册地址</FormLabel>
                <FormControl
                  type="text"
                  placeholder="请输入注册地址"
                  value={registerAddress}
                  onChange={(e) => setRegisterAddress(e.target.value)}
                  onBlur={handleInputSave}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>证照生效时间</FormLabel>
                <FormControl
                  type="date"
                  value={effectTime}
                  onChange={(e) => setEffectTime(e.target.value)}
                  onBlur={handleInputSave}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>证照过期时间</FormLabel>
                <FormControl
                  type="date"
                  value={expireTime}
                  onChange={(e) => setExpireTime(e.target.value)}
                  onBlur={handleInputSave}
                />
              </FormGroup>
            </>
          )}
          {requiredEmployerLetterTypes.includes(identityType) && (
            <FormGroup>
              <FormLabel>单位证明函照片</FormLabel>
              <FormControl
                type="file"
                mutiple
                onChange={(e) =>
                  setRequiredEmployerLetter(
                    Array.from(e.target.files).map((file) => file.name)
                  )
                }
                onBlur={handleInputSave}
              />
            </FormGroup>
          )}
          {identityType === "MSE" && (
            <>
              <FormGroup>
                <FormLabel>小微商户经营类型</FormLabel>
                <FormControl
                  as="select"
                  value={merchantType}
                  onChange={(e) => setMerchantType(e.target.value)}
                  onBlur={handleInputSave}
                >
                  <option value="STORE">门店场所（STORE）</option>
                  <option value="STALL">流动经营（STALL）</option>
                </FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel>门店名称</FormLabel>
                <FormControl
                  type="text"
                  placeholder="请输入门店名称"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  onBlur={handleInputSave}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>门店省份</FormLabel>
                <FormControl
                  type="text"
                  placeholder="请输入门店省份"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  onBlur={handleInputSave}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>门店城市</FormLabel>
                <FormControl
                  type="text"
                  placeholder="请输入门店城市"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onBlur={handleInputSave}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>门店街道</FormLabel>
                <FormControl
                  type="text"
                  placeholder="请输入门店街道"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  onBlur={handleInputSave}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>门店详细地址</FormLabel>
                <FormControl
                  type="text"
                  placeholder="请输入门店详细地址"
                  value={storeAddress}
                  onChange={(e) => setStoreAddress(e.target.value)}
                  onBlur={handleInputSave}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>门店门头照信息或摊位照</FormLabel>
                <FormControl
                  type="file"
                  multiple
                  placeholder="请输入图片"
                  onChange={(e) =>
                    setStoreDoorImg(
                      Array.from(e.target.files).map((file) => file.name)
                    )
                  }
                  onBlur={handleInputSave}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>门店店内照片或者摊位照侧面</FormLabel>
                <FormControl
                  type="file"
                  multiple
                  placeholder="请输入图片"
                  onChange={(e) =>
                    setStoreInnerImg(
                      Array.from(e.target.files).map((file) => file.name)
                    )
                  }
                  onBlur={handleInputSave}
                />
              </FormGroup>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
});

export default Step3;
