import React from "react";
import {
  Row,
  Col,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
  Form,
} from "react-bootstrap";

const Step1 = React.forwardRef((props, ref) => {
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState(null);
  const [invitationCode, setInvitationCode] = React.useState("");
  const [invitationCodeError, setInvitationCodeError] = React.useState(null);
  const [companyName, setCompanyName] = React.useState("");
  const [companyNameError, setCompanyNamelError] = React.useState(null);

  const handleInputSave = () => {
    props.updateStep1Data({ email, invitationCode, companyName });
    validateAllFields();
  };

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const validateAllFields = () => {
    const isEmailValid = emailRegex.test(email);
    setEmailError(
      isEmailValid ? null : (
        <small className="text-danger">
          Email is required and format should be <i>john@doe.com</i>.
        </small>
      )
    );

    const invitationCodeRegex = /^[A-Z0-9]+$/;
    const isInvitationCodeValid = invitationCodeRegex.test(invitationCode);
    setInvitationCodeError(
      isInvitationCodeValid ? null : (
        <small className="text-danger">
          Invitation code is required and should only contain uppercase letters
          and numbers.
        </small>
      )
    );

    const isCompanyNameValid = companyName.trim() !== "";
    setCompanyNamelError(
      isCompanyNameValid ? null : (
        <small className="text-danger">Company name is required.</small>
      )
    );

    return isEmailValid && isInvitationCodeValid && isCompanyNameValid;
  };

  React.useImperativeHandle(ref, () => ({
    isInvitationCodeValidated: validateAllFields,
    isValidated: validateAllFields,
  }));

  return (
    <div className="wizard-step" ref={ref}>
      <p className="text-center">Please tell us more about yourself.</p>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <FormGroup className={invitationCodeError ? "has-error" : ""}>
            <FormLabel>
              邀请码 <span className="text-danger">*</span>
            </FormLabel>
            <FormControl
              type="text"
              name="invitationCode"
              placeholder="ex: EV213H2UH8MS"
              value={invitationCode}
              onChange={(event) => setInvitationCode(event.target.value)}
              onBlur={validateAllFields}
            />
            {invitationCodeError}
          </FormGroup>
          <FormGroup className={companyNameError ? "has-error" : ""}>
            <FormLabel>
              名称 <span className="text-danger">*</span>
            </FormLabel>
            <FormControl
              type="text"
              name="companyName"
              placeholder="ex: 河北常青实业有限公司"
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
              onBlur={validateAllFields}
            />
            {companyNameError}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <FormGroup className={emailError ? "has-error" : ""}>
            <FormLabel>
              Email <span className="text-danger">*</span>
            </FormLabel>
            <FormControl
              type="email"
              name="email"
              placeholder="ex: hello@creative-tim.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              onBlur={validateAllFields}
            />
            {emailError}
          </FormGroup>
        </Col>
      </Row>
    </div>
  );
});

export default Step1;
