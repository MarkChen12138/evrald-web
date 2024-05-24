import React from "react";
import { Row, Col, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import Select from "react-select";

const Step2 = React.forwardRef((props, ref) => {
  const [contactName, setContactName] = React.useState("");
  const [contactPhoneNumber, setContactPhoneNumber] = React.useState("");
  const [contactCardNumber, setContactCardNumber] = React.useState("");
  const [contactCertType, setContactCertType] = React.useState("");
  const [errors, setErrors] = React.useState({});

  const contactCertTypes = [
    { value: "RESIDENT", label: "居民身份证" },
    { value: "PASSPORT", label: "护照" },
    { value: "PASSPORT_HK_MO", label: "港澳居民(往来大陆通行证)" },
    { value: "PASSPORT_TWN", label: "台湾居民(往来大陆通行证)" },
    { value: "RESIDENCE_PERMIT_HM", label: "港澳居民居住证" },
    { value: "RESIDENCE_PERMIT_TW", label: "台湾居民居住证" },
    { value: "PERMANENT_RESIDENCE_FOREIGNER", label: "外国人永久居住证" },
  ];

  const handleInputSave = () => {
    if (validateForm()) {
      props.updateStep2Data({
        contact_name: contactName,
        contact_phone_no: contactPhoneNumber,
        contact_card_no: contactCardNumber,
        contact_cert_type: contactCertType,
      });
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!contactName.trim()) {
      newErrors.contactName = "Contact name is required.";
    }
    if (!contactPhoneNumber.trim()) {
      newErrors.contactPhoneNumber = "Contact phone number is required.";
    }
    if (!contactCardNumber.trim()) {
      newErrors.contactCardNumber = "Contact card number is required.";
    }
    if (!contactCertType) {
      newErrors.contactCertType = "Contact certification type is required.";
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
            {errors.contactName && (
              <small className="text-danger">{errors.contactName}</small>
            )}
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
            {errors.contactPhoneNumber && (
              <small className="text-danger">{errors.contactPhoneNumber}</small>
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
              placeholder="ex: 233330199001010001"
              value={contactCardNumber}
              onChange={(event) => setContactCardNumber(event.target.value)}
              onBlur={handleInputSave}
            />
            {errors.contactCardNumber && (
              <small className="text-danger">{errors.contactCardNumber}</small>
            )}
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
              classNamePrefix={
                errors.contactCertType ? "react-select-error" : "react-select"
              }
            />
            {errors.contactCertType && (
              <small className="text-danger">{errors.contactCertType}</small>
            )}
          </FormGroup>
        </Col>
      </Row>
    </div>
  );
});

export default Step2;
