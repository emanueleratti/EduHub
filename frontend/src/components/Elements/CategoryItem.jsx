import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { CustomButton } from "../CustomButtons/CustomButton";

export const CategoryItem = ({ title, id }) => {
  return (
    <Container fluid>
      <Row className="d-flex flex-column gap-5">
        <Col className="py-3 px-4 lg-grey-bg d-flex justify-content-between align-items-center">
          <div className="d-flex gap-3 flex-column">
            <p className="sm bold secondary">CATEGORY</p>
            <p className="mid bold primary">{title.toUpperCase()}</p>
          </div>
          <div className="d-flex gap-3 pt-2">
            <CustomButton
              size="sm"
              style="filled-black"
              disabled={false}
              href={`/categories/${id}`}
            >
              Edit
            </CustomButton>
            <CustomButton
              size="sm"
              style="filled-black"
              onClick={() => handleDelete(id)}
              disabled={false}
            >
              Delete
            </CustomButton>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
