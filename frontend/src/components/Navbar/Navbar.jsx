import "./Navbar.css";
import React from "react";
import { Container } from "react-bootstrap";
import { useAtom } from "jotai";
import {
  categoriesPageDataAtom,
  categoriesPageActionsAtom,
  singleCoursePageActionsAtom,
} from "../../stateManager/atom";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categoriesPageData] = useAtom(categoriesPageDataAtom);
  const [, getCategories] = useAtom(categoriesPageActionsAtom);
  const [, getSingleCourse] = useAtom(singleCoursePageActionsAtom);

  useEffect(() => {
    getCategories({ type: "GET" });
    getSingleCourse({ type: "GET" });
  }, []);

  return (
    <Container
      fluid
      className="navbar d-flex justify-content-between px-4 px-lg-5"
    >
      <a className="logo black" href="/">
        Rhinoceros Corsi
      </a>

      <button
        className="burger-menu d-block d-md-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className={`ri-menu-line ${isOpen ? "open" : ""}`}></i>
      </button>

      <nav
        className={`nav-menu ${
          isOpen ? "d-flex" : "d-none"
        } d-md-flex gap-4 py-3 ${isOpen ? "open" : ""}`}
      >
        <a className="menu" href="/" onClick={() => setIsOpen(false)}>
          HOME
        </a>

        <div className="d-flex flex-column gap-3 dropdown position-relative">
          <a className="menu" href="/corsi" onClick={() => setIsOpen(false)}>
            CORSI
          </a>
          <div className="d-flex flex-column gap-3 submenu-container">
            {categoriesPageData
              ?.filter((category) => !category.isTemplate)
              .map((category, index) => (
                <a
                  key={index}
                  className="bold secondary submenu"
                  href={`/corsi/${category.slug}`}
                  onClick={() => setIsOpen(false)}
                >
                  {category.title.toUpperCase()}
                </a>
              ))}
          </div>
        </div>
        <a className="menu" href="/about" onClick={() => setIsOpen(false)}>
          CHI SIAMO
        </a>
        <a className="menu" href="/contact" onClick={() => setIsOpen(false)}>
          CONTATTI
        </a>
        <a
          className="menu"
          href="/dashboard/homepage"
          onClick={() => setIsOpen(false)}
        >
          <i className="ri-user-3-fill icon-sm"></i>
        </a>
      </nav>
    </Container>
  );
};
