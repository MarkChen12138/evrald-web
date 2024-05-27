import React from "react";
import {
  Row,
  Col,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
} from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert"; // 确保你已经安装了这个包

const Step1 = React.forwardRef((props, ref) => {
  const [invitationCode, setInvitationCode] = React.useState("");
  const [invitationCodeError, setInvitationCodeError] = React.useState(null);
  const [alertState, setAlertState] = React.useState(null);
  const [isFetching, setIsFetching] = React.useState(false); // State to handle fetching

  // const handleValidationClick = async () => {
  //   if (!validateAllFields()) return; // Prevent fetching if fields are invalid

  //   setIsFetching(true);
  //   try {
  //     const response = await fetch(
  //       `url/validate-invitation?code=${invitationCode}`,
  //       {
  //         method: "GET", // or 'POST' depending on your backend
  //       }
  //     );
  //     const data = await response.json();

  //     if (response.ok && data.isValid) {
  //       setAlertState(
  //         <SweetAlert
  //           success
  //           style={{ display: "block", marginTop: "-100px" }}
  //           title="Good job!"
  //           onConfirm={() => setAlertState(null)}
  //           onCancel={() => setAlertState(null)}
  //           confirmBtnBsStyle="info"
  //         >
  //           You clicked the finish button!
  //         </SweetAlert>
  //       );
  //     } else {
  //       setInvitationCodeError(
  //         <small className="text-danger">邀请码不正确或已过期</small>
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Failed to validate invitation code:", error);
  //     // Handle errors appropriately
  //   } finally {
  //     setIsFetching(false);
  //   }
  // };

  const validateInvitationCode = () => {
    const invitationCodeRegex = /^[A-Z0-9]+$/;
    const isValid = invitationCodeRegex.test(invitationCode);
    setInvitationCodeError(
      isValid ? null : (
        <small className="text-danger">
          邀请码是必须的，且只能包含大写字母和数字。
        </small>
      )
    );

    return isValid;
  };

  const handleValidationClick = async () => {
    if (!validateInvitationCode()) return; // Prevent action if field is invalid

    setIsFetching(true);
    // Simulate an API call
    setTimeout(() => {
      // Assume 'ABC123' is the valid invitation code for demonstration
      if (invitationCode === "ABC123") {
        setAlertState(
          <SweetAlert
            success
            style={{ display: "block", marginTop: "-100px" }}
            title="验证成功!"
            onConfirm={() => setAlertState(null)}
            onCancel={() => setAlertState(null)}
            confirmBtnBsStyle="info"
          >
            您的邀请码已通过验证。
          </SweetAlert>
        );
      } else {
        setInvitationCodeError(
          <small className="text-danger">邀请码不正确或已过期</small>
        );
      }
      setIsFetching(false);
    }, 1000); // Delay to mimic server response time
  };

  return (
    <div className="wizard-step" ref={ref}>
      <p className="text-center">请输入您的邀请码以继续。</p>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <FormGroup className={invitationCodeError ? "has-error" : ""}>
            <FormLabel>
              邀请码 <span className="text-danger">*</span>
            </FormLabel>
            <FormControl
              type="text"
              name="invitationCode"
              placeholder="例如：ABC123"
              value={invitationCode}
              onChange={(event) => setInvitationCode(event.target.value)}
              onBlur={validateInvitationCode}
            />
            {invitationCodeError}
          </FormGroup>
          <Button onClick={handleValidationClick} disabled={isFetching}>
            验证
          </Button>
        </Col>
      </Row>
      {alertState}
    </div>
  );
});

export default Step1;
