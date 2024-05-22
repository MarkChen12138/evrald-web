import React from "react";
import {
  Row,
  Col,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
} from "react-bootstrap";
import Select from "react-select"; // 确保你已经导入了这个库

const Step2 = React.forwardRef((props, ref) => {
  const [contactName, setContactName] = React.useState("");
  const [contactPhoneNumber, setContactPhoneNumber] = React.useState("");
  const [contactCardNumber, setContactCardNumber] = React.useState("");
  const [contactCardNumberError, setContactCardNumberError] =
    React.useState(null);
  const [contactCertType, setContactCertType] = React.useState("");

  const handleInputSave = () => {
    props.updateStep2Data({
      contact_name: contactName,
      contact_phone_no: contactPhoneNumber,
      contact_card_no: contactCardNumber,
      contact_cert_type: contactCertType,
    });
  };

  const contactCertTypes = [
    { value: "RESIDENT", label: "居民身份证" },
    { value: "PASSPORT", label: "护照" },
    { value: "PASSPORT_HK_MO", label: "港澳居民(往来大陆通行证)" },
    { value: "PASSPORT_TWN", label: "台湾居民(往来大陆通行证)" },
    { value: "RESIDENCE_PERMIT_HM", label: "港澳居民居住证" },
    { value: "RESIDENCE_PERMIT_TW", label: "台湾居民居住证" },
    { value: "PERMANENT_RESIDENCE_FOREIGNER", label: "外国人永久居住证" },
  ];

  const validateForm = () => {
    let errors = {};
    if (!contactName.trim()) {
      errors.name = "Contact name is required.";
    }
    if (!contactPhoneNumber.trim()) {
      errors.phone = "Contact phone number is required.";
    }
    if (!contactCardNumber.trim()) {
      errors.cardNumber = "Contact card number is required.";
    }
    if (!contactCertType) {
      errors.certType = "Contact certification type is required.";
    }

    if (Object.keys(errors).length === 0) {
      console.log("Form is valid, navigating to next page.");
    } else {
      console.log("Form is invalid:", errors);
    }
  };

  return (
    <div className="wizard-step" ref={ref}>
      <p className="text-center">Please tell us more about yourself.</p>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <FormGroup>
            <FormLabel>
              联系人姓名 <span className="text-danger">*</span>
            </FormLabel>
            <FormControl
              type="text"
              name="contactName"
              placeholder="ex: 张三"
              value={contactName}
              onChange={(event) => setContactName(event.target.value)}
              onBlur={handleInputSave}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>
              联系人电话 <span className="text-danger">*</span>
            </FormLabel>
            <FormControl
              type="text"
              name="contactPhoneNumber"
              placeholder="ex: 19999999999"
              value={contactPhoneNumber}
              onChange={(event) => setContactPhoneNumber(event.target.value)}
              onBlur={handleInputSave}
            />
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
              placeholder="ex: 233330199001010001"
              value={contactCardNumber}
              onChange={(event) => setContactCardNumber(event.target.value)}
              onBlur={handleInputSave}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <FormGroup>
            <FormLabel>
              联系人证件类型 <span className="text-danger">*</span>
            </FormLabel>
            <Select
              name="contactCertType"
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
        </Col>
      </Row>
    </div>
  );
});

export default Step2;
