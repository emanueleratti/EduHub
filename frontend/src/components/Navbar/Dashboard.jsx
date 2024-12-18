import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { Col } from "react-bootstrap";
import logo from "../../assets/eduhub-black.png";
import {
  categoriesPageDataAtom,
  categoriesPageActionsAtom,
  singleCoursePageDataAtom,
  singleCoursePageActionsAtom,
} from "../../stateManager/atom";
import { authActionsAtom } from "../../stateManager/authAtom";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../CustomButtons/CustomButton";

export const Dashboard = () => {
  const [categoriesPageData] = useAtom(categoriesPageDataAtom);
  const [, getCategories] = useAtom(categoriesPageActionsAtom);
  const [singleCoursePageData] = useAtom(singleCoursePageDataAtom);
  const [, getSingleCourse] = useAtom(singleCoursePageActionsAtom);
  const [, authCRUD] = useAtom(authActionsAtom);
  const navigate = useNavigate();

  const handleLogout = () => {
    authCRUD({ type: "LOGOUT" });
    navigate("/login");
  };

  useEffect(() => {
    getCategories({ type: "GET" });
    getSingleCourse({ type: "GET" });
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
        <a className="bold" href="/dashboard/about">
          ABOUT
        </a>
        <div className="d-flex flex-column gap-2">
          <a className="bold" href="/dashboard/categories">
            CATEGORIES
          </a>
          <ul className="d-flex flex-column gap-1 ps-3 mb-0">
            {categoriesPageData &&
              categoriesPageData.map((category, index) => (
                <li key={index}>
                  <a className="bold submenu secondary pointer-none">
                    {category.title.toUpperCase()}
                  </a>
                </li>
              ))}
          </ul>
        </div>
        <div className="d-flex flex-column gap-2">
          <a className="bold" href="/dashboard/single-course">
            COURSE
          </a>
          <ul className="d-flex flex-column gap-1 ps-3 mb-0">
            {singleCoursePageData &&
              singleCoursePageData.map((course, index) => (
                <li key={index}>
                  <a className="bold submenu secondary pointer-none">
                    {course.title.toUpperCase()}
                  </a>
                </li>
              ))}
          </ul>
        </div>
        <a href="/login" className="bold" onClick={handleLogout}>
          LOGOUT
        </a>
      </nav>
    </Col>
  );
};
