import "./TitleRow.css";
import React, { useState } from "react";
import festiveImg from "../../assets/festive.png";
import customizedImg from "../../assets/customized.png";
import { Col, Row, Container } from "react-bootstrap";

export const TitleStatic = ({ title, icon }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = (event) => {
    event.preventDefault();
    setIsExpanded(!isExpanded);
  };

  return (
    <Row className="level-container">
      <Col
        className={`col-12 ${
          isExpanded ? "row-expanded" : ""
        } row-bordered d-flex justify-content-between align-items-center py-3`}
      >
        <a href="#" onClick={handleToggle}>
          <h2>{title}</h2>
        </a>
        <a
          className="h-100 d-flex align-items-center mb-3 icon-toggle"
          href="#"
          onClick={handleToggle}
        >
          <i
            className={`${isExpanded ? "ri-subtract-fill" : icon} icon-lg mt-4`}
          ></i>
        </a>
      </Col>

      {isExpanded && (
        <>
          <Container className="pt-4 pb-5 d-flex flex-column gap-5 gap-lg-6 row-expanded-static">
            <Row className="gap-5 gap-lg-0">
              <Col className="col-12 col-lg-4 d-flex flex-column gap-4">
                <img src={festiveImg} width="160px" alt="group" />
                <p className="black bold">SERALE E FESTIVO</p>
                <span className="line-small black-bg"></span>
                <p className="black">
                  Proin viverra quam quis maximus consectetur. Pellentesque dui
                  tortor, consequat non tempor eget, tincidunt sed mauris.
                </p>
                <p className="black bold">SUPPLEMENTO ORARIO 40%</p>
              </Col>
              <Col className="col-12 col-lg-4 d-flex flex-column gap-4">
                <img src={customizedImg} width="160px" alt="group" />
                <p className="black bold">PERSONALIZZATO</p>
                <span className="line-small black-bg"></span>
                <p className="black">
                  Proin viverra quam quis maximus consectetur. Pellentesque dui
                  tortor, consequat non tempor eget, tincidunt sed mauris.
                </p>
                <p className="black bold">COSTO : DA 35€/H + IVA</p>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </Row>
  );
};
