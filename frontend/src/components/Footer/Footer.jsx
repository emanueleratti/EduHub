import "./Footer.css";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useAtom } from "jotai";
import { categoriesPageDataAtom } from "../../stateManager/atom";

export const Footer = () => {
  const [categoriesPageData] = useAtom(categoriesPageDataAtom);

  return (
    <Container fluid className="gradient-bg">
      <Container className="footer d-flex flex-column gap-5">
        <Row className="top g-4">
          <Col className="col-12 col-md-7 flex-grow-1 d-flex flex-column gap-2">
            <div className="logo">Rhinoceros Corsi</div>{" "}
            <p className="small">
              Rhinoceros Corsi è Centro di Formazione Autorizzato McNeel. Tutti
              i nostri Corsi di Rhinoceros sono certificati da insegnanti ART
              (Authorized Rhinoceros Trainer) con oltre 10 anni di esperienza
              attiva e diretta nel settore della progettazione professionale, e
              nella docenza specialistica, anche a livello universitario.
            </p>
          </Col>
          <Col className="col-12 col-md-2 offset-md-1 flex-grow-0 d-flex flex-column gap-2">
            <span className="line white-bg mb-2"></span>
            <h5>Categorie</h5>
            {categoriesPageData
              ?.filter((category) => !category.isTemplate)
              .map((category, index) => (
                <a
                  key={index}
                  className="small"
                  href={`/corsi/${category.slug}`}
                >
                  {category.title.toUpperCase()}
                </a>
              ))}
          </Col>
          <Col className="col-12 col-md-2 flex-grow-0 d-flex flex-column gap-2">
            <span className="line white-bg mb-2"></span>
            <h5>Contatti</h5>
            <a
              className="small d-flex align-items-center gap-2"
              href="tel:+39055579555"
            >
              <i className="ri-phone-fill icon-xs"></i> 055 57 95 55
            </a>
            <a
              className="small d-flex align-items-center gap-2"
              href="mailto:info@rhinoceroscorsi.it"
            >
              <i className="ri-mail-line icon-xs"></i> info@rhinoceroscorsi.it
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
