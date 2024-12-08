import "./Navbar.css";
import React from "react";
import { Container } from "react-bootstrap";

export const Navbar = () => {
  return (
    <Container fluid className="navbar d-flex justify-content-between px-5">
      <div className="logo black">SoftwareLogo</div>
      <nav className="d-flex gap-5 py-3 primary">
        <a className="menu" href="/">
          HOME
        </a>
        <a className="menu" href="/corsi">
          CORSI
        </a>
        <a className="menu" href="#">
          CHI SIAMO
        </a>
        <a className="menu" href="#">
          CONTACT
        </a>
        <a className="menu" href="/dashboard/homepage">
          <i className="ri-user-3-fill icon-sm"></i>
        </a>
      </nav>
    </Container>
  );
};
