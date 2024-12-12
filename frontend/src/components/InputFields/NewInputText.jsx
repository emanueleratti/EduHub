import React from "react";
import { Form, Col } from "react-bootstrap";

export const NewInputText = ({
  label,
  name,
  value,
  onChange,
  rows,
  description,
  handleSubmit,
}) => {
  return (
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
  );
};
