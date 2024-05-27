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
  const [isvalidated, setIsValidated] = React.useState(false);
  const [step3Files, setStep3Files] = React.useState(null);
  const [step4Files, setStep4Files] = React.useState(null);
  const [step5Files, setStep5Files] = React.useState(null);
  const API_URL = "https://api.example.com/authorder-create"; // Replace with your actual URL
  // const [step1Data, setStep1Data] = React.useState({
  //   email: "",
  //   invitationCode: "",
  //   companyName: "",
  // });

  // const updateStep1Data = (newData) => {
  //   setStep1Data((prevData) => ({ ...prevData, ...newData }));
  // };

  const [step2Data, setStep2Data] = React.useState({
    contact_person_info: {},
  });

  const updateStep2Data = (newData) => {
    setStep2Data({
      contact_person_info: {
        ...newData,
      },
    });
    console.log(step2Data);
  };

  const [step3Data, setStep3Data] = React.useState({
    auth_identity_info: { identity_type: "" },
  });

  const updateStep3Data = (newData) => {
    setStep3Data({
      auth_identity_info: {
        ...newData,
      },
    });
  };

  const [step4Data, setStep4Data] = React.useState({
    legal_person_info: {},
  });

  const updateStep4Data = (newData) => {
    setStep4Data({
      legal_person_info: {
        ...newData,
      },
    });
    console.log(step4Data);
  };

  const [step5Data, setStep5Data] = React.useState({});

  const updateStep5Data = (newData) => {
    setStep5Data(newData);
    console.log(step5Data);
  };

  const steps = [
    {
      stepName: "公司邀请码确认",
      component: Step1,
      stepProps: {},
    },
    {
      stepName: "联系人信息",
      component: Step2,
      stepProps: { updateStep2Data },
    },
    {
      stepName: "主体信息",
      component: Step3,
      stepProps: { updateStep3Data, setStep3Files },
    },
    {
      stepName: "法人身份信息",
      component: Step4,
      stepProps: {
        updateStep4Data,
        setStep4Files,
        identityType: step3Data.auth_identity_info.identity_type,
      },
    },
    {
      stepName: "补充信息",
      component: Step5,
      stepProps: {
        updateStep5Data,
        setStep5Files,
        isBenefitPersonInfoRequired:
          step3Data.auth_identity_info.identity_type === "ENTERPRISE" &&
          !step4Data.legal_person_info.is_benefit_person,
        setIsValidated,
      },
    },
  ];

  const [alertState, setAlertState] = React.useState(false);
  const [cardClasses, setCardClasses] = React.useState("card-hidden");

  React.useEffect(() => {
    setTimeout(function () {
      setCardClasses("");
    }, 1000);
  });

  function handleSubmit() {
    // Here you would gather your formData, typically it could be structured based on your form states
    const formData = {
      out_biz_no: "your_business_code", // This would be generated or predefined
      contact_person_info: step2Data.contact_person_info,
      auth_identity_info: step3Data.auth_identity_info,
      legal_person_info: step4Data.legal_person_info,
    };

    // Conditionally add benefit_person_info based on specific conditions
    if (
      step3Data.auth_identity_info.identity_type === "ENTERPRISE" &&
      !step4Data.legal_person_info.is_benefit_person
    ) {
      formData.benefit_person_info = step5Data; // Assuming step5Data contains all required fields
    }

    console.log(formData);

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Check the response from your API
        if (
          data.alipay_merchant_indirect_authorder_create_response.code ===
          "10000"
        ) {
          setAlertState(
            <SweetAlert
              success
              style={{ display: "block", marginTop: "-100px" }}
              title="Registration Successful!"
              onConfirm={() => setAlertState(null)}
              confirmBtnBsStyle="info"
            >
              Your registration has been successfully processed.
            </SweetAlert>
          );
        } else {
          setAlertState(
            <SweetAlert
              error
              style={{ display: "block", marginTop: "-100px" }}
              title="Registration Failed!"
              onConfirm={() => setAlertState(null)}
              confirmBtnBsStyle="info"
            >
              There was a problem with your registration.
            </SweetAlert>
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setAlertState(
          <SweetAlert
            error
            style={{ display: "block", marginTop: "-100px" }}
            title="Network Error"
            onConfirm={() => setAlertState(null)}
            confirmBtnBsStyle="info"
          >
            Network error, please try again later.
          </SweetAlert>
        );
      });
  }

  function handleImageUpload() {
    const formData = new FormData();

    // 添加第三步的文件
    if (step3Files) {
      Array.from(step3Files).forEach((file) => {
        formData.append("files", file);
      });
    }

    // 添加第四步的文件
    if (step4Files) {
      Array.from(step4Files).forEach((file) => {
        formData.append("files", file);
      });
    }

    // 添加第五步的文件
    if (step5Files) {
      Array.from(step5Files).forEach((file) => {
        formData.append("files", file);
      });
    }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    fetch(API_URL, {
      method: "POST",
      body: formData, // 不设置 'Content-Type'，让浏览器自己设置
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // 处理响应数据
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

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
                    handleSubmit(), handleImageUpload();
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
