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
  const [legalNameError, setLegalNameError] = React.useState(null);
  const [legalPhoneNumber, setLegalPhoneNumber] = React.useState("");
  const [legalPhoneNumberError, setLegalPhoneNumberError] =
    React.useState(null);
  const [legalCardNumber, setLegalCardNumber] = React.useState("");
  const [legalCardNumberError, setLegalCardNumberError] = React.useState(null);
  const [effectTime, setEffectTime] = React.useState("");
  const [expireTime, setExpireTime] = React.useState("");
  const [cardFontImg, setCardFontImg] = React.useState([]);
  const [legalType, setLegalType] = React.useState("");
  const [cardBackImg, setCardBackImg] = React.useState(null);
  const [authLetterImg, setAuthLetterImg] = React.useState(null);
  const [isBenefitPerson, setIsBenefitPerson] = React.useState(true);

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
    console.log(props.identityType);
    const Step4Data = {
      card_type: cardType,
      person_name: legalName,
      card_no: legalCardNumber,
      effect_time: effectTime,
      expire_time: expireTime,
      card_font_img: cardFontImg,
    };
    if (props.identityType === "GOV" || props.identityType === "INST") {
      Step4Data.legal_type = legalType;
    }
    if (cardType === "RESIDENT") {
      Step4Data.card_back_img = cardBackImg;
    }
    if (legalType === "AGENT_PERSON") {
      Step4Data.auth_letter_img = authLetterImg;
    }
    if (isBenefitPerson === false) {
      Step4Data.is_benefit_person = isBenefitPerson;
    }
  };

  // 验证姓名
  const validateName = () => {
    if (legalName.trim() === "") {
      setLegalNameError("法人姓名不能为空");
      return false;
    } else {
      setLegalNameError(null);
      return true;
    }
  };

  // 验证电话号码
  const validatePhoneNumber = () => {
    const phoneRegex = /^[1-9]\d{9}$/; // 仅示例，根据实际需求调整
    if (!phoneRegex.test(legalPhoneNumber.trim())) {
      setLegalPhoneNumberError("电话号码格式不正确");
      return false;
    } else {
      setLegalPhoneNumberError(null);
      return true;
    }
  };

  // 验证证件号码
  const validateCardNumber = () => {
    if (legalCardNumber.trim() === "") {
      setLegalCardNumberError("证件号码不能为空");
      return false;
    } else {
      setLegalCardNumberError(null);
      return true;
    }
  };

  // 综合验证所有字段
  const isValidated = () => {
    const isNameValid = validateName();
    const isPhoneValid = validatePhoneNumber();
    const isCardValid = validateCardNumber();
    return isNameValid && isPhoneValid && isCardValid;
  };

  React.useImperativeHandle(ref, () => ({
    isValidated,
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
              onBlur={validateName}
            />
            {legalNameError && (
              <small className="text-danger">{legalNameError}</small>
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
              onBlur={validatePhoneNumber}
            />
            {legalPhoneNumberError && (
              <small className="text-danger">{legalPhoneNumberError}</small>
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
              onBlur={validateCardNumber}
            />
            {legalCardNumberError && (
              <small className="text-danger">{legalCardNumberError}</small>
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
          <FormGroup>
            <FormLabel>法人/经营者证件正面照</FormLabel>
            <FormControl
              type="file"
              multiple
              placeholder="请输入图片"
              onChange={(e) =>
                setCardFontImg(
                  Array.from(e.target.files).map((file) => file.name)
                )
              }
              onBlur={handleInputSave}
            />
          </FormGroup>
          {(props.identityType === "GOV" || props.identityType === "INST") && (
            <FormGroup>
              <FormLabel>
                证件持有人类型 <span className="text-danger">*</span>
              </FormLabel>
              <Select
                name="legalType"
                value={contactCertTypes.find(
                  (type) => type.value === contactCertType
                )}
                options={contactCertTypes}
                onChange={(selectedOption) =>
                  setContactCertType(selectedOption.value)
                }
                onBlur={handleInputSave}
              />
            </FormGroup>
          )}
          {cardType === "RESIDENT" && (
            <FormGroup>
              <FormLabel>法人/经营者证件反面照</FormLabel>
              <FormControl
                type="file"
                multiple
                placeholder="请输入图片"
                onChange={(e) =>
                  setCardBackImg(
                    Array.from(e.target.files).map((file) => file.name)
                  )
                }
                onBlur={handleInputSave}
              />
            </FormGroup>
          )}
          <FormGroup>
            <FormLabel>授权函照片</FormLabel>
            <FormControl
              type="file"
              multiple
              placeholder="请输入图片"
              onChange={(e) =>
                setAuthLetterImg(
                  Array.from(e.target.files).map((file) => file.name)
                )
              }
              onBlur={handleInputSave}
            />
          </FormGroup>

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
          </FormGroup>
        </Col>
      </Row>
    </div>
  );
});

export default Step4;
