import React from "react";
import { Form, Col } from "react-bootstrap";
import { CustomButton } from "../CustomButtons/CustomButton";

export const NewInputImg = ({
  label,
  name,
  onChange,
  description,
  preview,
  handleSubmit,
}) => {
  return (
    <Col className="col-6">
      <div className="flex-grow-1">
        <Form.Group className="w-100 mb-3" onSubmit={handleSubmit}>
          <Form.Label className="bold">{label}</Form.Label>
          <Form.Control
            type="file"
            name={name}
            accept="image/*"
            onChange={onChange}
          />
          <Form.Text>{description}</Form.Text>
        </Form.Group>
        <CustomButton
          size="sm"
          style="filled-black"
          // onClick={}
          disabled={false}
          type="submit"
        >
          Upload
        </CustomButton>
      </div>
    </Col>
  );
};
