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
  const [financialOrgCertImg, setFinancialOrgCertImg] = useState([]);
  const [certificateType, setCertificateType] = useState("");
  const [certType, setCertType] = useState("");
  const [certNo, setCertNo] = useState("");
  const [merchantName, setMerchantName] = useState("");
  const [legalPersonName, setLegalPersonName] = useState("");
  const [registerAddress, setRegisterAddress] = useState("");
  const [effectTime, setEffectTime] = useState("");
  const [expireTime, setExpireTime] = useState("");
  const [employerLetterImg, setEmployerLetter] = useState(null);
  const [merchantType, setMerchantType] = useState("");
  const [storeName, setStoreName] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [storeDoorImg, setStoreDoorImg] = useState(null);
  const [storeInnerImg, setStoreInnerImg] = useState(null);
  const [errors, setErrors] = useState({});
  const [certImg, setCertImg] = useState(null);

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

  const requiredCertificateTypes = [
    "ENTERPRISE",
    "IND_BIZ",
    "GOV",
    "INST",
    "ORG",
  ];

  const requiredEmployerLetterTypes = ["GOV", "INST"];

  const handleInputSave = () => {
    if (validateForm()) {
      const formFiles = new FormData();

      const authIdentityInfo = {
        identity_type: identityType,
        is_financial_org: isFinancialOrg,
      };
      if (isFinancialOrg) {
        authIdentityInfo.financial_org_info = {
          financial_org_type: financialOrgType,
          financial_org_cert_img: Array.from(financialOrgCertImg).map(
            (file) => file.name
          ),
        };
        console.log("financialOrgCertImg", financialOrgCertImg);
        Array.from(financialOrgCertImg).forEach((file, index) =>
          formFiles.append(`financial_org_cert_img_${index + 1}`, file)
        );

        // 使用 FormData.entries() 检查 FormData 内容
        for (let [key, value] of formFiles.entries()) {
          console.log(`${key}:`, value);
        }
      }

      authIdentityInfo.certificate_type = certificateType;
      if (
        certType !== "" &&
        certNo !== "" &&
        certImg !== "" &&
        merchantName !== "" &&
        legalPersonName !== "" &&
        registerAddress !== "" &&
        effectTime !== "" &&
        expireTime !== ""
      ) {
        authIdentityInfo.certificate_info = {
          cert_type: certType,
          cert_no: certNo,
          cert_image: certImg[0].name,
          merchant_name: merchantName,
          legal_person_name: legalPersonName,
          register_address: registerAddress,
          effect_time: effectTime,
          expire_time: expireTime,
        };
        formFiles.append("certImg", certImg[0]);
      }
      if (employerLetterImg) {
        authIdentityInfo.employer_letter_img = employerLetterImg[0].name;
        formFiles.append("employerLetterImg", employerLetterImg[0]);
      }
      if (identityType === "MSE") {
        authIdentityInfo.merchant_info = {
          merchant_type: merchantType,
          store_name: storeName,
          province: province,
          city: city,
          district: district,
          store_address: storeAddress,
          store_door_img: storeDoorImg[0].name,
          store_inner_img: storeInnerImg[0].name,
        };
        formFiles.append("storeDoorImg", storeDoorImg[0]);
        formFiles.append("storeInnerImg", storeInnerImg[0]);
      }
      props.updateStep3Data(authIdentityInfo);
      console.log("formFiles", formFiles);
      props.setStep3Files(formFiles);
    }
  };

  React.useImperativeHandle(ref, () => ({
    isValidated: validateForm,
    handleInputSave: handleInputSave,
  }));

  const validateForm = () => {
    let newErrors = {};
    // Example error setup, repeat for each field
    if (!merchantName.trim()) newErrors.merchantName = "商户名称不能为空";
    if (!legalPersonName.trim()) newErrors.legalPersonName = "法人姓名不能为空";
    if (!registerAddress.trim()) newErrors.registerAddress = "注册地址不能为空";
    if (!certNo.trim()) newErrors.certNo = "证件编号不能为空";
    if (!certImg) newErrors.certImg = "请上传证照图片";
    if (isFinancialOrg) {
      if (!financialOrgType.trim()) {
        newErrors.financialOrgType = "请选择金融机构类型";
      }
      if (financialOrgCertImg.length === 0) {
        newErrors.financialOrgCertImg = "请上传金融机构许可证图片";
      } else if (financialOrgCertImg.length > 5) {
        newErrors.financialOrgCertImg = "最多上传五张图片";
      }
    }
    if (requiredCertificateTypes.includes(identityType)) {
      if (!certNo.trim()) newErrors.certNo = "证件编号不能为空";
      if (!merchantName.trim()) newErrors.merchantName = "商户名称不能为空";
      if (!legalPersonName.trim())
        newErrors.legalPersonName = "法人姓名不能为空";
      if (!registerAddress.trim())
        newErrors.registerAddress = "注册地址不能为空";
      if (!effectTime.trim()) newErrors.effectTime = "生效时间不能为空";
      if (!expireTime.trim()) newErrors.expireTime = "过期时间不能为空";
      if (certificateType === "BUSINESS_CERT") {
        if (!certType) newErrors.certType = "请选择证照类型";
      }
    }
    if (requiredEmployerLetterTypes.includes(identityType)) {
      if (!employerLetterImg)
        newErrors.employerLetterImg = "请上传单位证明函照片";
    }
    if (identityType === "MSE") {
      if (!storeName.trim()) newErrors.storeName = "门店名称不能为空";
      if (!province.trim()) newErrors.province = "门店省份不能为空";
      if (!district.trim()) newErrors.district = "门店街道不能为空";
      if (!storeAddress.trim()) newErrors.storeAddress = "门店详细地址不能为空";
      if (!storeDoorImg)
        newErrors.storeDoorImg = "请上传门店门头照信息或摊位照";
      if (!storeInnerImg)
        newErrors.storeInnerImg = "请上传门店店内照片或者摊位照侧面";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  React.useImperativeHandle(ref, () => ({
    isValidated: validateForm,
    handleInputSave: handleInputSave,
  }));

  return (
    <div className="wizard-step" ref={ref}>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <p className="text-center">
            Please tell us more about your organization.
          </p>
          <FormGroup>
            <FormLabel>
              主体类型<span className="text-danger">*</span>
            </FormLabel>
            <Select
              name="identityType"
              value={identityOptions.find(
                (option) => option.value === identityType
              )}
              options={identityOptions}
              onChange={(option) => setIdentityType(option.value)}
              onBlur={handleInputSave}
            />
            {errors.identityType && (
              <small className="text-danger">{errors.identityType}</small>
            )}
          </FormGroup>
          <FormGroup>
            <FormLabel>
              是否为金融机构<span className="text-danger">*</span>
            </FormLabel>
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
            {errors.isFinancialOrg && (
              <small className="text-danger">{errors.isFinancialOrg}</small>
            )}
          </FormGroup>
          {isFinancialOrg && (
            <>
              <FormGroup>
                <FormLabel>
                  金融机构类型<span className="text-danger">*</span>
                </FormLabel>
                <Select
                  name="financialOrgType"
                  value={financialTypes.find(
                    (type) => type.value === financialOrgType
                  )}
                  options={financialTypes}
                  onChange={(option) => setFinancialOrgType(option.value)}
                  onBlur={handleInputSave}
                />
                {errors.financialOrgType && (
                  <small className="text-danger">
                    {errors.financialOrgType}
                  </small>
                )}
              </FormGroup>
              <FormGroup>
                <FormLabel>
                  金融机构许可证图片（最多五张）
                  <span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setFinancialOrgCertImg(e.target.files)}
                  onBlur={handleInputSave}
                />
                {errors.financialOrgCertImg && (
                  <small className="text-danger">
                    {errors.financialOrgCertImg}
                  </small>
                )}
              </FormGroup>
            </>
          )}
          {requiredCertificateTypes.includes(identityType) && (
            <>
              <FormGroup>
                <FormLabel>
                  证件信息 <span className="text-danger">*</span>
                </FormLabel>
                <Select
                  name="certificateType"
                  value={certificateTypes.find(
                    (type) => type.value === certificateType
                  )}
                  options={certificateTypes}
                  onChange={(option) => setCertificateType(option.value)}
                  onBlur={handleInputSave}
                />
                {errors.certificateType && (
                  <small className="text-danger">
                    {errors.certificateType}
                  </small>
                )}
              </FormGroup>
              {certificateType === "BUSINESS_CERT" && (
                <FormGroup>
                  <FormLabel>
                    证照类型 <span className="text-danger">*</span>
                  </FormLabel>
                  <Select
                    name="certType"
                    value={certTypes.find((type) => type.value === certType)}
                    options={certTypes}
                    onChange={(option) => setCertType(option.value)}
                    onBlur={handleInputSave}
                  />
                  {errors.certType && (
                    <small className="text-danger">{errors.certType}</small>
                  )}
                </FormGroup>
              )}
              <FormGroup>
                <FormLabel>
                  证件编号 <span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  type="text"
                  placeholder="请输入证件编号"
                  value={certNo}
                  onChange={(e) => setCertNo(e.target.value)}
                  onBlur={handleInputSave}
                />
                {errors.certNo && (
                  <small className="text-danger">{errors.certNo}</small>
                )}
              </FormGroup>
              <FormGroup>
                <FormLabel>
                  证照图片 <span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  type="file"
                  accept="image/*"
                  placeholder="请输入图片链接"
                  onChange={(e) => setCertImg(e.target.files)}
                />
                {}
              </FormGroup>
              <FormGroup>
                <FormLabel>
                  证照商户名称 <span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  type="text"
                  placeholder="请输入商户名称"
                  value={merchantName}
                  onChange={(e) => setMerchantName(e.target.value)}
                  onBlur={handleInputSave}
                />
                {errors.merchantName && (
                  <small className="text-danger">{errors.merchantName}</small>
                )}
              </FormGroup>
              <FormGroup>
                <FormLabel>
                  法人姓名 <span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  type="text"
                  placeholder="请输入法人姓名"
                  value={legalPersonName}
                  onChange={(e) => setLegalPersonName(e.target.value)}
                  onBlur={handleInputSave}
                />
                {errors.legalPersonName && (
                  <small className="text-danger">
                    {errors.legalPersonName}
                  </small>
                )}
              </FormGroup>
              <FormGroup>
                <FormLabel>
                  注册地址 <span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  type="text"
                  placeholder="请输入注册地址"
                  value={registerAddress}
                  onChange={(e) => setRegisterAddress(e.target.value)}
                  onBlur={handleInputSave}
                />
                {errors.registerAddress && (
                  <small className="text-danger">
                    {errors.registerAddress}
                  </small>
                )}
              </FormGroup>
              <FormGroup>
                <FormLabel>
                  证照生效时间 <span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  type="date"
                  value={effectTime}
                  onChange={(e) => setEffectTime(e.target.value)}
                  onBlur={handleInputSave}
                />
                {errors.effectTime && (
                  <small className="text-danger">{errors.effectTime}</small>
                )}
              </FormGroup>
              <FormGroup>
                <FormLabel>
                  证照过期时间 <span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  type="date"
                  value={expireTime}
                  onChange={(e) => setExpireTime(e.target.value)}
                  onBlur={handleInputSave}
                />
                {errors.expireTime && (
                  <small className="text-danger">{errors.expireTime}</small>
                )}
              </FormGroup>
            </>
          )}
          {requiredEmployerLetterTypes.includes(identityType) && (
            <FormGroup>
              <FormLabel>
                单位证明函照片 <span className="text-danger">*</span>
              </FormLabel>
              <FormControl
                type="file"
                mutiple
                onChange={(e) => setEmployerLetter(e.target.files)}
                onBlur={handleInputSave}
              />
              {errors.employerLetterImg && (
                <small className="text-danger">
                  {errors.employerLetterImg}
                </small>
              )}
            </FormGroup>
          )}
          {identityType === "MSE" && (
            <>
              <FormGroup>
                <FormLabel>
                  小微商户经营类型 <span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  as="select"
                  value={merchantType}
                  onChange={(e) => setMerchantType(e.target.value)}
                  onBlur={handleInputSave}
                >
                  <option value="STORE">门店场所（STORE）</option>
                  <option value="STALL">流动经营（STALL）</option>
                </FormControl>
                {errors.merchantType && (
                  <small className="text-danger">{errors.merchantType}</small>
                )}
              </FormGroup>
              <FormGroup>
                <FormLabel>
                  门店名称 <span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  type="text"
                  placeholder="请输入门店名称"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  onBlur={handleInputSave}
                />
                {errors.storeName && (
                  <small className="text-danger">{errors.storeName}</small>
                )}
              </FormGroup>
              <FormGroup>
                <FormLabel>
                  门店省份 <span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  type="text"
                  placeholder="请输入门店省份"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  onBlur={handleInputSave}
                />
                {errors.province && (
                  <small className="text-danger">{errors.province}</small>
                )}
              </FormGroup>
              <FormGroup>
                <FormLabel>
                  门店城市 <span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  type="text"
                  placeholder="请输入门店城市"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onBlur={handleInputSave}
                />
                {errors.city && (
                  <small className="text-danger">{errors.city}</small>
                )}
              </FormGroup>
              <FormGroup>
                <FormLabel>
                  门店街道 <span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  type="text"
                  placeholder="请输入门店街道"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  onBlur={handleInputSave}
                />
                {errors.district && (
                  <small className="text-danger">{errors.district}</small>
                )}
              </FormGroup>
              <FormGroup>
                <FormLabel>
                  门店详细地址 <span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  type="text"
                  placeholder="请输入门店详细地址"
                  value={storeAddress}
                  onChange={(e) => setStoreAddress(e.target.value)}
                  onBlur={handleInputSave}
                />
                {errors.storeAddress && (
                  <small className="text-danger">{errors.storeAddress}</small>
                )}
              </FormGroup>
              <FormGroup>
                <FormLabel>
                  门店门头照信息或摊位照 <span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  type="file"
                  accept="image/*"
                  placeholder="请输入图片"
                  onChange={(e) => setStoreDoorImg(e.target.files)}
                  onBlur={handleInputSave}
                />
                {errors.storeDoorImg && (
                  <small className="text-danger">{errors.storeDoorImg}</small>
                )}
              </FormGroup>
              <FormGroup>
                <FormLabel>
                  门店店内照片或者摊位照侧面{" "}
                  <span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  type="file"
                  accept="image/*"
                  placeholder="请输入图片"
                  onChange={(e) => setStoreInnerImg(e.target.files)}
                  onBlur={handleInputSave}
                />
                {errors.storeInnerImg && (
                  <small className="text-danger">{errors.storeInnerImg}</small>
                )}
              </FormGroup>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
});

export default Step3;
