import React from "react";
import { Col } from "react-bootstrap";
import logo from "../../assets/eduhub-black.png";

export const Dashboard = () => {
  return (
    <Col className="col flex-grow-0 d-flex flex-column gap-5 py-5 px-4">
      <img src={logo} alt="logo" width={200} />
      <a className="bold secondary" href="/">
        BACK TO SITE
      </a>
      <nav className="d-flex flex-column gap-3">
        <a className="bold" href="/dashboard/homepage">
          HOME
        </a>
        <a className="bold" href="/dashboard/courses">
          COURSES
        </a>
        <a className="bold" href="#">
          CATEGORIES
        </a>
        <a className="bold" href="#">
          CORSI
        </a>
      </nav>
    </Col>
  );
};
