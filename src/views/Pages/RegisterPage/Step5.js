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

const Step5 = React.forwardRef((props, ref) => {
  const [contactName, setContactName] = React.useState("");
  const [contactNameError, setContactNameError] = React.useState(null);
  const [contactPhoneNumber, setContactPhoneNumber] = React.useState("");
  const [contactPhoneNumberError, setContactPhoneNumberError] =
    React.useState(null);
  const [contactCardNumber, setContactCardNumber] = React.useState("");
  const [contactCardNumberError, setContactCardNumberError] =
    React.useState(null);

  // 验证姓名
  const validateName = () => {
    if (contactName.trim() === "") {
      setContactNameError("受益人姓名不能为空");
      return false;
    } else {
      setContactNameError(null);
      return true;
    }
  };

  // 验证电话号码
  const validatePhoneNumber = () => {
    const phoneRegex = /^[1-9]\d{9}$/; // 仅示例，根据实际需求调整
    if (!phoneRegex.test(contactPhoneNumber.trim())) {
      setContactPhoneNumberError("电话号码格式不正确");
      return false;
    } else {
      setContactPhoneNumberError(null);
      return true;
    }
  };

  // 验证证件号码
  const validateCardNumber = () => {
    if (contactCardNumber.trim() === "") {
      setContactCardNumberError("证件号码不能为空");
      return false;
    } else {
      setContactCardNumberError(null);
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
        <Col md={{ span: 5, offset: 1 }}>
          <FormGroup>
            <FormLabel>
              受益人姓名 <span className="text-danger">*</span>
            </FormLabel>
            <FormControl
              type="text"
              name="contactName"
              placeholder="请输入您的姓名"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              onBlur={validateName}
            />
            {contactNameError && (
              <small className="text-danger">{contactNameError}</small>
            )}
          </FormGroup>
        </Col>
        <Col md={5}>
          <FormGroup>
            <FormLabel>
              受益人电话 <span className="text-danger">*</span>
            </FormLabel>
            <FormControl
              type="text"
              name="contactPhoneNumber"
              placeholder="请输入您的电话号码"
              value={contactPhoneNumber}
              onChange={(e) => setContactPhoneNumber(e.target.value)}
              onBlur={validatePhoneNumber}
            />
            {contactPhoneNumberError && (
              <small className="text-danger">{contactPhoneNumberError}</small>
            )}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <FormGroup>
            <FormLabel>
              证件号码 <span className="text-danger">*</span>
            </FormLabel>
            <FormControl
              type="text"
              name="contactCardNumber"
              placeholder="请输入您的证件号码"
              value={contactCardNumber}
              onChange={(e) => setContactCardNumber(e.target.value)}
              onBlur={validateCardNumber}
            />
            {contactCardNumberError && (
              <small className="text-danger">{contactCardNumberError}</small>
            )}
          </FormGroup>
          <FormLabel>
            证件生效时间 <span className="text-danger">*</span>
          </FormLabel>
          <ReactDatetime
            inputProps={{
              className: "form-control",
              placeholder: "请选择日期",
            }}
            timeFormat={false}
          />
          <FormLabel>
            证件过期时间 <span className="text-danger">*</span>
          </FormLabel>
          <ReactDatetime
            inputProps={{
              className: "form-control",
              placeholder: "请选择日期",
            }}
            timeFormat={false}
          />
          <FormLabel>
            证件过期时间 <span className="text-danger">*</span>
          </FormLabel>
          <input type="file" />
        </Col>
      </Row>
    </div>
  );
});

export default Step5;
