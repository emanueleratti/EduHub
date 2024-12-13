import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { Col } from "react-bootstrap";
import logo from "../../assets/eduhub-black.png";
import {
  categoriesPageDataAtom,
  categoriesPageActionsAtom,
  coursePageDataAtom,
  coursePageActionsAtom,
} from "../../stateManager/atom";

export const Dashboard = () => {
  const [categoriesPageData] = useAtom(categoriesPageDataAtom);
  const [, getCategories] = useAtom(categoriesPageActionsAtom);
  const [coursePageData] = useAtom(coursePageDataAtom);
  const [, getCourse] = useAtom(coursePageActionsAtom);

  useEffect(() => {
    getCategories({ type: "GET" });
    getCourse({ type: "GET" });
  }, []);

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
        <div className="d-flex flex-column gap-2">
          <a className="bold" href="/dashboard/categories">
            CATEGORIES
          </a>
          <ul className="d-flex flex-column gap-2 ps-3 mb-0">
            {categoriesPageData &&
              categoriesPageData.map((category, index) => (
                <li key={index}>
                  <a className="bold submenu secondary">
                    {category.title.toUpperCase()}
                  </a>
                </li>
              ))}
          </ul>
        </div>
        <div className="d-flex flex-column gap-2">
          <a className="bold" href="/dashboard/course">
            COURSE
          </a>
          <ul className="d-flex flex-column gap-2 ps-3">
            {coursePageData &&
              coursePageData.map((course, index) => (
                <li key={index}>
                  <a className="bold submenu secondary">
                    {course.title.toUpperCase()}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </nav>
    </Col>
  );
};
