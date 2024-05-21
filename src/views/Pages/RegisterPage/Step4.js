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
  const [legalName, setLegalName] = React.useState("");
  const [legalNameError, setLegalNameError] = React.useState(null);
  const [legalPhoneNumber, setLegalPhoneNumber] = React.useState("");
  const [legalPhoneNumberError, setLegalPhoneNumberError] =
    React.useState(null);
  const [legalCardNumber, setLegalCardNumber] = React.useState("");
  const [legalCardNumberError, setLegalCardNumberError] = React.useState(null);
  const [effectTime, setEffectTime] = React.useState("");
  const [expireTime, setExpireTime] = React.useState("");

  const handleInputSave = () => {
    props.updateStep4Data({
      card_type: cardType,
      person_name: legalName,
      card_no: legalCardNumber,
      legal_cert_type: legalCertType,
    });
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
          <FormLabel>
            证件过期时间 <span className="text-danger">*</span>
          </FormLabel>
          <input type="file" />
        </Col>
      </Row>
    </div>
  );
});

export default Step4;
