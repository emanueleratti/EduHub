import "./TitleRow.css";
import groupImg from "../../assets/group.png";
import singleImg from "../../assets/single.png";
import friendImg from "../../assets/friend.png";
import React, { useState } from "react";
import { Col, Row, Container } from "react-bootstrap";

export const TitleElement = ({
  title,
  icon,
  description,
  programListTitle,
  programFirstList,
  programSecondList,
  programThirdList,
  singlePrice,
  singleDescription,
  singleDuration,
  groupPrice,
  groupDescription,
  groupDuration,
  friendPrice,
  friendDescription,
  friendDuration,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = (event) => {
    event.preventDefault();
    setIsExpanded(!isExpanded);
  };

  const createListFromString = (text) => {
    if (!text) return [];

    if (Array.isArray(text)) return text;

    try {
      const textString = String(text);
      return textString.split(",").map((item) => item.trim());
    } catch (error) {
      console.error(error);
      return [];
    }
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
          <Container className="pt-4 pb-5 d-flex flex-column gap-6">
            <Row className="gap-5 gap-lg-0">
              <Col className="col-12 col-lg-4 d-flex flex-column gap-4">
                <img src={groupImg} width="160px" alt="group" />
                <p className="black bold">DI GRUPPO</p>
                <span className="line-small black-bg"></span>
                <p className="black bold">{groupDuration}</p>
                <p className="black">{groupPrice}</p>
                <p className="black">{groupDescription}</p>
              </Col>
              <Col className="col-12 col-lg-4 d-flex flex-column gap-4">
                <img src={singleImg} width="160px" alt="group" />
                <p className="black bold">SINGOLO UTENTE</p>
                <span className="line-small black-bg"></span>
                <p className="black bold">{singleDuration}</p>
                <p className="black">{singlePrice}</p>
                <p className="black">{singleDescription}</p>
              </Col>
              <Col className="col-12 col-lg-4 d-flex flex-column gap-4">
                <img src={friendImg} width="160px" alt="group" />
                <p className="black bold">PORTA UN AMICO</p>
                <span className="line-small black-bg"></span>
                <p className="black bold">{friendDuration}</p>
                <p className="black">{friendPrice}</p>
                <p className="black">{friendDescription}</p>
              </Col>
            </Row>
            {/* DESCRIPTION */}
            <Row>
              <Col className="col-12 d-flex flex-column gap-5">
                <p className="md">{description}</p>
              </Col>
            </Row>
            {/* PROGRAM LIST */}
            <Row>
              <Col className="col-12">
                <p className="black bold">{programListTitle}</p>
              </Col>
              <Col className="col-12 col-lg-4">
                <ul className="md d-flex flex-column gap-1 py-2">
                  {createListFromString(programFirstList).map((item, index) => (
                    <li key={index}>
                      <p className="py-1">{item}</p>
                    </li>
                  ))}
                </ul>
              </Col>
              <Col className="col-12 col-lg-4">
                <ul className="d-flex flex-column gap-1 py-2">
                  {createListFromString(programSecondList).map(
                    (item, index) => (
                      <li key={index}>
                        <p className="py-1">{item}</p>
                      </li>
                    )
                  )}
                </ul>
              </Col>
              <Col className="col-12 col-lg-4">
                <ul className="md d-flex flex-column gap-1 py-2">
                  {createListFromString(programThirdList).map((item, index) => (
                    <li key={index}>
                      <p className="py-1">{item}</p>
                    </li>
                  ))}
                </ul>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </Row>
  );
};
