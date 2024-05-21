import React from "react";
// react component used to create charts
import SweetAlert from "react-bootstrap-sweetalert";
// react component that creates a form divided into multiple steps
import ReactWizard from "react-bootstrap-wizard";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  InputGroup,
  Navbar,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
} from "react-bootstrap";

import Step1 from "./Step1.js";
import Step2 from "./Step2.js";
import Step3 from "./Step3.js";
import Step4 from "./Step4.js";
import Step5 from "./Step5.js";

function RegisterPage() {
  const updateStep1Data = (newData) => {
    setStep1Data((prevData) => ({ ...prevData, ...newData }));
    console.log(step1Data);
  };

  const [step1Data, setStep1Data] = React.useState({
    email: "",
    invitationCode: "",
    companyName: "",
  });

  const updateStep2Data = (newData) => {
    setStep2Data((prevData) => ({
      ...prevData,
      contact_person_info: {
        ...prevData.contact_person_info,
        ...newData,
      },
    }));
  };

  const [step2Data, setStep2Data] = React.useState({
    contact_person_info: {
      contact_name: "",
      contact_phone_no: "",
      contact_card_no: "",
      contact_cert_type: "",
    },
  });

  const steps = [
    {
      stepName: "公司邀请码确认",
      component: Step1,
      stepProps: { updateStep1Data },
    },
    {
      stepName: "联系人信息",
      component: Step2,
      stepProps: { updateStep2Data },
    },
    { stepName: "主体信息", component: Step3 },
    { stepName: "法人身份信息", component: Step4 },
    { stepName: "补充信息", component: Step5 },
  ];

  const [alertState, setAlertState] = React.useState(false);
  const [cardClasses, setCardClasses] = React.useState("card-hidden");
  React.useEffect(() => {
    setTimeout(function () {
      setCardClasses("");
    }, 1000);
  });

  return (
    <>
      <div
        className="full-page section-image"
        data-color="black"
        data-image={require("assets/img/full-screen-image-2.jpg")}
      >
        <div className="content d-flex align-items-center p-0">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="8">
                <ReactWizard
                  steps={steps}
                  navSteps
                  title="公司注册"
                  description="需要完成以下步骤才可以加入我们的数据库！"
                  headerTextCenter
                  validate
                  color="blue"
                  previousButtonText="Back"
                  nextButtonText="Next"
                  finishButtonClasses="btn-info btn-wd"
                  nextButtonClasses="btn-info btn-wd"
                  previousButtonClasses="btn-wd"
                  finishButtonClick={() => {
                    setAlertState(
                      <SweetAlert
                        success
                        style={{ display: "block", marginTop: "-100px" }}
                        title="Good job!"
                        onConfirm={() => setAlertState(null)}
                        onCancel={() => setAlertState(null)}
                        confirmBtnBsStyle="info"
                      >
                        You clicked the finish button!
                      </SweetAlert>
                    );
                  }}
                />
              </Col>
            </Row>
          </Container>
          {alertState}
        </div>
        <div
          className="full-page-background"
          style={{
            backgroundImage:
              "url(" + require("assets/img/full-screen-image-2.jpg") + ")",
          }}
        ></div>
      </div>
    </>
  );
}

export default RegisterPage;
