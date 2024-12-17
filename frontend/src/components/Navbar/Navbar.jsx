import "./Navbar.css";
import React from "react";
import { Container } from "react-bootstrap";
import { useAtom } from "jotai";
import {
  categoriesPageDataAtom,
  categoriesPageActionsAtom,
  singleCoursePageDataAtom,
  singleCoursePageActionsAtom,
} from "../../stateManager/atom";
import { useEffect } from "react";

export const Navbar = () => {
  const [categoriesPageData] = useAtom(categoriesPageDataAtom);
  const [, getCategories] = useAtom(categoriesPageActionsAtom);
  const [singleCoursePageData] = useAtom(singleCoursePageDataAtom);
  const [, getSingleCourse] = useAtom(singleCoursePageActionsAtom);

  useEffect(() => {
    getCategories({ type: "GET" });
    getSingleCourse({ type: "GET" });
  }, []);

  return (
    <Container fluid className="navbar d-flex justify-content-between px-5">
      <div className="logo black">Rhinoceros Corsi</div>
      <nav className="d-flex gap-5 py-3 primary">
        <a className="menu" href="/">
          HOME
        </a>

        <div className="d-flex flex-column gap-2 dropdown position-relative">
          <a className="menu" href="/corsi">
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
                >
                  {category.title.toUpperCase()}
                </a>
              ))}
          </div>
        </div>
        <a className="menu" href="/about">
          CHI SIAMO
        </a>
        <a className="menu" href="/contact">
          CONTATTI
        </a>
        <a className="menu" href="/dashboard/homepage">
          <i className="ri-user-3-fill icon-sm"></i>
        </a>
      </nav>
    </Container>
  );
};
