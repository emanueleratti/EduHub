import React from "react";
import { Form, Col } from "react-bootstrap";

export const NewSelect = ({
  label,
  name,
  value,
  onChange,
  description,
  col,
  options,
  placeholder = "Seleziona un'opzione",
}) => {
  return (
    <Col className={`col-${col || 6}`}>
      <div className="flex-grow-1">
        <Form.Group className="w-100">
          <Form.Label className="bold secondary">{label}</Form.Label>
          <Form.Select
            name={name}
            value={value}
            onChange={onChange}
            className="form-control"
          >
            <option value="">{placeholder}</option>
            {options?.map((option) => (
              <option key={option._id} value={option._id}>
                {option.title}
              </option>
            ))}
          </Form.Select>
          <Form.Text>{description}</Form.Text>
        </Form.Group>
      </div>
    </Col>
  );
};
