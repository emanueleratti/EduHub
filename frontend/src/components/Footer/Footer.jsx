import "./Footer.css";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export const Footer = () => {
  return (
    <Container fluid className="gradient-bg">
      <Container className="footer d-flex flex-column gap-5">
        <Row className="top g-4">
          <Col className="col-12 col-md-7 flex-grow-1 d-flex flex-column gap-2">
            <div className="logo">SoftwareLogo</div>{" "}
            <p className="small">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              euismod vitae ipsum vitae pharetra. Fusce fringilla eget diam ut
              molestie. Aenean aliquam ipsum sit amet eros convallis, nec
              facilisis urna pharetra.
            </p>
          </Col>
          <Col className="col-12 col-md-2 offset-md-1 flex-grow-0 d-flex flex-column gap-2">
            <span className="line white-bg mb-2"></span>
            <h5>Tipologie Corsi</h5>
            <a className="small" href="#">
              Tipologia 1
            </a>
            <a className="small" href="#">
              Tipologia 2
            </a>
            <a className="small" href="#">
              Tipologia 3
            </a>
            <a className="small" href="#">
              Tipologia 4
            </a>
            <a className="small" href="#">
              Tipologia 5
            </a>
          </Col>
          <Col className="col-12 col-md-2 flex-grow-0 d-flex flex-column gap-2">
            <span className="line white-bg mb-2"></span>
            <h5>Contatti</h5>
            <a
              className="small d-flex align-items-center gap-2"
              href="tel:+393333333333"
            >
              <i className="ri-phone-fill icon-xs"></i> +393333333333
            </a>
            <a
              className="small d-flex align-items-center gap-2"
              href="mailto:info@example.com"
            >
              <i className="ri-mail-line icon-xs"></i> info@example.com
            </a>
          </Col>
        </Row>
        <Row className="bottom">
          <span className="line white-bg mb-4"></span>
          <Col className="col-12 col-md-6 d-flex gap-4">
            <a className="small" href="#">
              Privacy Policy
            </a>
            <a className="small" href="#">
              Cookie Policy
            </a>
          </Col>
          <Col className="col-12 col-md-6 d-flex justify-content-end gap-3">
            <a href="#">
              <i className="ri-facebook-fill icon-xs"></i>
            </a>
            <a href="#">
              <i className="ri-linkedin-fill icon-xs"></i>
            </a>
            <a href="#">
              <i className="ri-instagram-line icon-xs"></i>
            </a>
            <a href="#">
              <i className="ri-arrow-up-s-line icon-sm"></i>
            </a>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};
