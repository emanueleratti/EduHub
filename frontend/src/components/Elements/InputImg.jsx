import React from "react";
import { Form, Col } from "react-bootstrap";

export const InputImg = ({
  label,
  name,
  onChange,
  description,
  preview,
  disabled,
}) => {
  return (
    <div className="d-flex gap-3 mb-3">
      <Col className="col-6 d-flex flex-column justify-content-between">
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
      </Col>
      <Col className="col-6">
        <p className="sm bold">Preview</p>
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            width="250"
            className="image-preview"
          />
        ) : (
          <div className="image-preview-placeholder">
            Nessuna immagine selezionata
          </div>
        )}
      </Col>
    </div>
  );
};
