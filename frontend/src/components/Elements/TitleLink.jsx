import "./TitleRow.css";
import React from "react";
import { Col, Row } from "react-bootstrap";

export const TitleLink = ({ title, icon, link }) => {
  return (
    <Row>
      <Col className="col-12 row-bordered d-flex justify-content-between align-items-center py-3">
        <a href={link}>
          <h2>{title}</h2>
        </a>
        <a
          className="h-100 d-flex align-items-center mb-3 icon-link"
          href={link}
        >
          <i className={`${icon} icon-lg mt-4`}></i>
        </a>
      </Col>
    </Row>
  );
};
