import React from "react";
import {
  Row,
  Col,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
} from "react-bootstrap";

const Step1 = React.forwardRef((props, ref) => {
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState(null);
  const [invitationCode, setInvitationCode] = React.useState("");
  const [invitationCodeError, setInvitationCodeError] = React.useState(null);
  const [companyName, setCompanyName] = React.useState("");
  const [companyNameError, setCompanyNamelError] = React.useState(null);

  const handleInputSave = () => {
    // Call the passed in updateFormData function to update parent state
    props.updateStep1Data({ email, invitationCode, companyName });
  };

  const isValidated = () => {
    console.log("hey");
    var re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    re.test(email) === false
      ? setEmailError(
          <small className="text-danger">
            Email is required and format should be <i>john@doe.com</i>.
          </small>
        )
      : setEmailError(null);
    return re.test(email);
  };
  React.useImperativeHandle(ref, () => ({
    isValidated: () => {
      console.log("hey from use");
      return isValidated();
    },
  }));

  const isInvitationCodeValidated = () => {
    console.log("hey");
    var re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    re.test(invitationCode) === false
      ? setInvitationCodeError(
          <small className="text-danger">
            InvitationCode is required and format should be <i>john@doe.com</i>.
          </small>
        )
      : setInvitationCodeError(null);
    return re.test(InvitationCode);
  };
  React.useImperativeHandle(ref, () => ({
    isInvitationCodeValidated: () => {
      console.log("hey from use");
      return isInvitationCodeValidated();
    },
  }));
  return (
    <div className="wizard-step" ref={ref}>
      <p className="text-center">Please tell us more about yourself.</p>
      <Row>
        <Col md={{ span: 5, offset: 1 }}>
          <FormGroup>
            <FormLabel>
              公司邀请码 <span className="text-danger">*</span>
            </FormLabel>
            <FormControl
              type="text"
              name="invitationCode"
              placeholder="ex:EV213H2UH8MS"
              value={invitationCode}
              onChange={(event) => setInvitationCode(event.target.value)}
              onBlur={handleInputSave}
            />
            {invitationCodeError}
          </FormGroup>
        </Col>
        <Col md={5}>
          <FormGroup>
            <FormLabel>
              公司名称 <span className="text-danger">*</span>
            </FormLabel>
            <FormControl
              type="text"
              name="last_name"
              placeholder="ex: 河北常青实业有限公司"
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
              // onBlur={handleInputSave}
            />
            {companyNameError}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <FormGroup>
            <FormLabel>
              Email <span className="text-danger">*</span>
            </FormLabel>
            <FormControl
              type="email"
              name="email"
              placeholder="ex: hello@creative-tim.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              onBlur={handleInputSave}
            />
            {emailError}
          </FormGroup>
          <Button className="btn-outline" type="button" variant="default">
            Right
          </Button>
        </Col>
      </Row>
      <Row></Row>
    </div>
  );
});

export default Step1;
