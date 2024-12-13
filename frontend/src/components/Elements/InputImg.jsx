import React from "react";
import { Form, Col } from "react-bootstrap";
import { CustomButton } from "../CustomButtons/CustomButton";

export const InputImg = ({
  label,
  name,
  onChange,
  description,
  preview,
  handleSubmit,
}) => {
  return (
    <div className="d-flex gap-3 mb-3">
      <Col className="col-6 d-flex flex-column justify-content-between">
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
      </Col>
      <Col className="col-6">
        <p className="sm bold">Preview</p>
        <img
          src={preview}
          alt="Preview"
          width="250"
          className="image-preview"
        />
      </Col>
    </div>
  );
};
