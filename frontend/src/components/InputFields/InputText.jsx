import React from "react";
import { Form, Col } from "react-bootstrap";

export const InputText = ({
  label,
  name,
  value,
  onChange,
  rows,
  description,
  handleSubmit,
  preview,
}) => {
  return (
    <div className="d-flex gap-3 mb-3">
      <Col className="col-6">
        <Form.Group className="w-100" onSubmit={handleSubmit}>
          <Form.Label className="bold secondary">{label}</Form.Label>
          <Form.Control
            as="textarea"
            name={name}
            rows={rows}
            className="no-resize"
            value={value}
            onChange={onChange}
          />
          <Form.Text>{description}</Form.Text>
        </Form.Group>
      </Col>
      <Col className="col-6">
        <p className="sm bold secondary">Preview</p>
        <p className="sm description">{preview}</p>
      </Col>
    </div>
  );
};
