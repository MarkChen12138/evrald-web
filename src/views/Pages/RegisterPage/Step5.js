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
import { parseZone } from "moment";

const cardTypes = [
  { value: "RESIDENT", label: "居民身份证" },
  { value: "PASSPORT", label: "护照" },
  { value: "PASSPORT_HK_MO", label: "港澳居民(往来大陆通行证)" },
  { value: "PASSPORT_TWN", label: "台湾居民(往来大陆通行证)" },
  { value: "RESIDENCE_PERMIT_HM", label: "港澳居民居住证" },
  { value: "RESIDENCE_PERMIT_TW", label: "台湾居民居住证" },
  { value: "PERMANENT_RESIDENCE_FOREIGNER", label: "外国人永久居住证" },
];

const Step5 = React.forwardRef((props, ref) => {
  const [cardType, setCardType] = React.useState("RESIDENT");
  const [benefitName, setBenefitName] = React.useState("");
  const [benefitPhoneNumber, setBenefitPhoneNumber] = React.useState("");
  React.useState(null);
  const [benefitCardNumber, setBenefitCardNumber] = React.useState("");
  const [cardFontImg, setCardFontImg] = React.useState(null);
  const [cardBackImg, setCardBackImg] = React.useState(null);
  const [effectTime, setEffectTime] = React.useState("");
  const [expireTime, setExpireTime] = React.useState("");
  const [errors, setErrors] = React.useState({});

  const validateForm = () => {
    let newErrors = {};
    const phoneRegex = /^[1-9]\d{9}$/;
    if (!benefitName.trim()) {
      newErrors.benefitName = "受益人名字不能为空";
    }

    if (!benefitPhoneNumber.trim()) {
      newErrors.benefitPhoneNumber = "受益人电话不能为空";
    } else if (!phoneRegex.test(benefitPhoneNumber.trim())) {
      newErrors.benefitPhoneNumber = "电话号码格式不正确";
    }

    if (!benefitCardNumber.trim()) {
      newErrors.benefitCardNumber = "证件号码不能为空";
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
    if (cardType === "RESIDENT") {
      if (!cardBackImg) {
        newErrors.cardBackImg = "证件反面照不能为空";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputSave = () => {
    if (validateForm()) {
      const formFiles = new FormData();
      formFiles.append("cardFontImg", cardFontImg[0]);
      if (cardType === "RESIDENT") {
        formFiles.append("cardBackImg", cardBackImg[0]);
      }

      const Step5Data = {
        benefit_person_info: {
          person_name: benefitName,
          card_no: benefitCardNumber,
          card_type: cardType,
          effect_time: effectTime,
          expire_time: expireTime,
          card_font_img: cardFontImg[0].name,
        },
      };
      if (cardType === "RESIDENT") {
        Step5Data.benefit_person_info.card_back_img = cardBackImg[0].name;
      }
      props.updateStep5Data(Step5Data);
      props.setStep5Files(formFiles);
    }
  };

  React.useImperativeHandle(ref, () => ({
    isvalidated: validateForm,
  }));

  return (
    <div className="wizard-step" ref={ref}>
      <p className="text-center">请提供您的详细信息。</p>
      {props.isBenefitPersonInfoRequired && (
        <div>
          {" "}
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
                  onChange={(selectedOption) =>
                    setCardType(selectedOption.value)
                  }
                  onBlur={handleInputSave}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>
                  受益人姓名 <span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  type="text"
                  name="benefitName"
                  placeholder="请输入您的姓名"
                  value={benefitName}
                  onChange={(e) => setBenefitName(e.target.value)}
                  onBlur={handleInputSave}
                />
                {errors.benefitName && (
                  <small className="text-danger">{errors.benefitName}</small>
                )}
              </FormGroup>
              <FormGroup>
                <FormLabel>
                  受益人电话 <span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  type="text"
                  name="benefitPhoneNumber"
                  placeholder="请输入您的电话号码"
                  value={benefitPhoneNumber}
                  onChange={(e) => setBenefitPhoneNumber(e.target.value)}
                  onBlur={handleInputSave}
                />
                {errors.benefitPhoneNumber && (
                  <small className="text-danger">
                    {errors.benefitPhoneNumber}
                  </small>
                )}
              </FormGroup>

              <FormGroup>
                <FormLabel>
                  证件号码 <span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  type="text"
                  name="benefitCardNumber"
                  placeholder="请输入您的证件号码"
                  value={benefitCardNumber}
                  onChange={(e) => setBenefitCardNumber(e.target.value)}
                  onBlur={handleInputSave}
                />
                {errors.benefitCardNumber && (
                  <small className="text-danger">
                    {errors.benefitCardNumber}
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
              <FormGroup>
                <FormLabel>
                  受益人/经营者证件正面照<span className="text-danger">*</span>
                </FormLabel>
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
              {cardType === "RESIDENT" && (
                <FormGroup>
                  <FormLabel>
                    受益人/经营者证件反面照
                    <span className="text-danger">*</span>
                  </FormLabel>
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
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
});

export default Step5;
