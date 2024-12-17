import React from "react";
import { Form, Col } from "react-bootstrap";

export const NewInputImg = ({
  label,
  name,
  onChange,
  description,
  disabled,
}) => {
  return (
    <Col className="col-6">
      <div className="flex-grow-1">
        <Form encType="multipart/form-data">
          <Form.Group className="w-100 mb-3">
            <Form.Label className="bold">{label}</Form.Label>
            <Form.Control
              type="file"
              name={name}
              accept="image/*"
              onChange={onChange}
              disabled={disabled}
            />
            <Form.Text>{description}</Form.Text>
          </Form.Group>
        </Form>
      </div>
    </Col>
  );
};
