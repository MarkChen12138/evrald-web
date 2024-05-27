import React from "react";
import ReactDatetime from "react-datetime";
import Select from "react-select";
import Slider from "nouislider";
import FileUploadWithPreview from "../../Components/PreviewImage.js";
import {
  Row,
  Col,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
} from "react-bootstrap";

const Step4 = React.forwardRef((props, ref) => {
  const [cardType, setCardType] = React.useState("RESIDENT");
  const [legalName, setLegalName] = React.useState("");
  const [legalPhoneNumber, setLegalPhoneNumber] = React.useState("");
  const [legalCardNumber, setLegalCardNumber] = React.useState("");
  const [effectTime, setEffectTime] = React.useState("");
  const [expireTime, setExpireTime] = React.useState("");
  const [cardFontImg, setCardFontImg] = React.useState(null);
  const [legalType, setLegalType] = React.useState("");
  const [cardBackImg, setCardBackImg] = React.useState(null);
  const [authLetterImg, setAuthLetterImg] = React.useState(null);
  const [isBenefitPerson, setIsBenefitPerson] = React.useState(true);
  const [errors, setErrors] = React.useState({});

  const cardTypes = [
    { value: "RESIDENT", label: "居民身份证" },
    { value: "PASSPORT", label: "护照" },
    { value: "PASSPORT_HK_MO", label: "港澳居民(往来大陆通行证)" },
    { value: "PASSPORT_TWN", label: "台湾居民(往来大陆通行证)" },
    { value: "RESIDENCE_PERMIT_HM", label: "港澳居民居住证" },
    { value: "RESIDENCE_PERMIT_TW", label: "台湾居民居住证" },
    { value: "PERMANENT_RESIDENCE_FOREIGNER", label: "外国人永久居住证" },
  ];

  const legalTypeOptions = [
    { value: "LEGAL_PERSON", label: "法人" },
    { value: "AGENT_PERSON", label: "经办人" },
  ];

  const binaryOptions = [
    { value: true, label: "是" },
    { value: false, label: "否" },
  ];

  const handleInputSave = () => {
    if (validateForm()) {
      const formFiles = new FormData();
      formFiles.append("cardFontImg", cardFontImg[0]);
      if (cardType === "RESIDENT") {
        formFiles.append("cardBackImg", cardBackImg[0]);
      }
      if (legalType === "AGENT_PERSON") {
        formFiles.append("authLetterImg", authLetterImg[0]);
      }

      const Step4Data = {
        card_type: cardType,
        person_name: legalName,
        card_no: legalCardNumber,
        effect_time: effectTime,
        expire_time: expireTime,
        card_font_img: cardFontImg[0].name,
      };
      if (props.identityType === "GOV" || props.identityType === "INST") {
        Step4Data.legal_type = legalType;
      }
      if (cardType === "RESIDENT") {
        Step4Data.card_back_img = cardBackImg[0].name;
      }
      if (legalType === "AGENT_PERSON") {
        Step4Data.auth_letter_img = authLetterImg;
      }
      Step4Data.is_benefit_person = isBenefitPerson;
      props.updateStep4Data(Step4Data);
      props.setStep4Files(formFiles);
    }
  };

  const validateForm = () => {
    let newErrors = {};
    const phoneRegex = /^[1-9]\d{9}$/;
    if (!legalName.trim()) {
      newErrors.legalName = "法人名字不能为空";
    }

    if (!legalPhoneNumber.trim()) {
      newErrors.legalPhoneNumber = "法人电话不能为空";
    } else if (!phoneRegex.test(legalPhoneNumber.trim())) {
      newErrors.legalPhoneNumber = "电话号码格式不正确";
    }

    if (!legalCardNumber.trim()) {
      newErrors.legalCardNumber = "证件号码不能为空";
    }
    if (!cardType) {
      newErrors.cardType = "证件类型不能为空";
    }
    if (!effectTime) {
      newErrors.effectTime = "证照生效时间不能为空";
    }
    if (!expireTime) {
      newErrors.expireTime = "证照过期时间不能为空";
    }
    if (!cardFontImg) {
      newErrors.cardFontImg = "证件正面照不能为空";
    }
    if (props.identityType === "GOV" || props.identityType === "INST") {
      if (!legalType) {
        newErrors.legalType = "证件持有人类型不能为空";
      }
    }
    if (cardType === "RESIDENT") {
      if (!cardBackImg) {
        newErrors.cardBackImg = "证件反面照不能为空";
      }
    }
    if (legalType === "AGENT_PERSON") {
      if (!authLetterImg) {
        newErrors.authLetterImg = "授权函照片不能为空";
      }
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
      <p className="text-center">请提供您的详细信息。</p>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <FormGroup>
            <FormLabel>
              联系人证件类型 <span className="text-danger">*</span>
            </FormLabel>
            <Select
              name="cardType"
              value={cardTypes.find((type) => type.value === cardType)}
              options={cardTypes}
              onChange={(selectedOption) => setCardType(selectedOption.value)}
              onBlur={handleInputSave}
            />
            {errors.cardType && (
              <small className="text-danger">{errors.cardType}</small>
            )}
          </FormGroup>
          <FormGroup>
            <FormLabel>
              法人姓名 <span className="text-danger">*</span>
            </FormLabel>
            <FormControl
              type="text"
              name="legalName"
              placeholder="请输入您的姓名"
              value={legalName}
              onChange={(e) => setLegalName(e.target.value)}
              onBlur={validateForm}
            />
            {errors.legalName && (
              <small className="text-danger">{errors.legalName}</small>
            )}
          </FormGroup>
          <FormGroup>
            <FormLabel>
              法人电话 <span className="text-danger">*</span>
            </FormLabel>
            <FormControl
              type="text"
              name="legalPhoneNumber"
              placeholder="请输入您的电话号码"
              value={legalPhoneNumber}
              onChange={(e) => setLegalPhoneNumber(e.target.value)}
              onBlur={validateForm}
            />
            {errors.legalPhoneNumber && (
              <small className="text-danger">{errors.legalPhoneNumber}</small>
            )}
          </FormGroup>
          <FormGroup>
            <FormLabel>
              证件号码 <span className="text-danger">*</span>
            </FormLabel>
            <FormControl
              type="text"
              name="legalCardNumber"
              placeholder="请输入您的证件号码"
              value={legalCardNumber}
              onChange={(e) => setLegalCardNumber(e.target.value)}
              onBlur={handleInputSave}
            />
            {errors.legalCardNumber && (
              <small className="text-danger">{errors.legalCardNumber}</small>
            )}
          </FormGroup>
          <FormGroup>
            <FormLabel>证照生效时间</FormLabel>
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
            <FormLabel>证照过期时间</FormLabel>
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
          <FormGroup>
            <FormLabel>法人/经营者证件正面照</FormLabel>
            <FormControl
              type="file"
              placeholder="请输入图片"
              onChange={(e) => setCardFontImg(e.target.files)}
              onBlur={handleInputSave}
            />
            {errors.cardFontImg && (
              <small className="text-danger">{errors.cardFontImg}</small>
            )}
          </FormGroup>
          {(props.identityType === "GOV" || props.identityType === "INST") && (
            <FormGroup>
              <FormLabel>
                证件持有人类型 <span className="text-danger">*</span>
              </FormLabel>
              <Select
                name="legalType"
                value={legalTypeOptions.find(
                  (type) => type.value === legalType
                )}
                options={legalTypeOptions}
                onChange={(selectedOption) =>
                  setLegalType(selectedOption.value)
                }
                onBlur={handleInputSave}
              />
              {errors.legalType && (
                <small className="text-danger">{errors.legalType}</small>
              )}
            </FormGroup>
          )}
          {cardType === "RESIDENT" && (
            <FormGroup>
              <FormLabel>法人/经营者证件反面照</FormLabel>
              <FormControl
                type="file"
                placeholder="请输入图片"
                onChange={(e) => setCardBackImg(e.target.files)}
                onBlur={handleInputSave}
              />
              {errors.cardBackImg && (
                <small className="text-danger">{errors.cardBackImg}</small>
              )}
            </FormGroup>
          )}
          {legalType === "AGENT_PERSON" && (
            <FormGroup>
              <FormLabel>授权函照片</FormLabel>
              <FormControl
                type="file"
                placeholder="请输入图片"
                onChange={(e) => setAuthLetterImg(e.target.files)}
                onBlur={handleInputSave}
              />
              {errors.authLetterImg && (
                <small className="text-danger">{errors.authLetterImg}</small>
              )}
            </FormGroup>
          )}

          <FormGroup>
            <FormLabel>经营者/法人是否为受益人</FormLabel>
            <Select
              name="isBenefitPerson"
              value={binaryOptions.find(
                (option) => option.value === isBenefitPerson
              )}
              options={binaryOptions}
              onChange={(option) => setIsBenefitPerson(option.value)}
              placeholder="经营者/法人是否为受益人"
              onBlur={handleInputSave}
            />
            {errors.isBenefitPerson && (
              <small className="text-danger">{errors.isBenefitPerson}</small>
            )}
          </FormGroup>
        </Col>
      </Row>
    </div>
  );
});

export default Step4;
