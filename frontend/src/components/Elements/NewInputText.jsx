import React from "react";
import { Form, Col } from "react-bootstrap";

export const NewInputText = ({
  label,
  name,
  value,
  onChange,
  rows,
  description,
  col,
}) => {
  return (
    <Col className={`col-${col || 6}`}>
      <div className="flex-grow-1">
        <Form.Group className="w-100">
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
      </div>
    </Col>
  );
};
