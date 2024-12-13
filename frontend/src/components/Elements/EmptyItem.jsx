import React from "react";
import { Col } from "react-bootstrap";

export const EmptyItem = ({ col }) => {
  return (
    <Col className={`col-${col || 6}`}>
      <div className="flex-grow-1">
        <div className="empty-item"></div>
      </div>
    </Col>
  );
};
