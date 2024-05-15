// CustomAlerts.js
import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";

export const SuccessAlert = ({ onConfirm, onCancel, title, text }) => (
  <SweetAlert
    success
    style={{ display: "block", marginTop: "-100px" }}
    title={title}
    onConfirm={onConfirm}
    onCancel={onCancel}
    confirmBtnBsStyle="info"
  >
    {text}
  </SweetAlert>
);

export const BasicAlert = ({ onConfirm, onCancel }) => (
  <SweetAlert
    style={{ display: "block", marginTop: "-100px" }}
    title="Here's a message!"
    onConfirm={onConfirm}
    onCancel={onCancel}
    confirmBtnBsStyle="info"
  />
);

// Similarly, export other alerts like TitleAndTextAlert, HtmlAlert, etc.
