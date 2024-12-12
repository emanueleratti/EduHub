import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { Col } from "react-bootstrap";
import logo from "../../assets/eduhub-black.png";
import {
  categoriesPageDataAtom,
  categoriesPageActionsAtom,
} from "../../stateManager/atom";

export const Dashboard = () => {
  const [categoriesPageData] = useAtom(categoriesPageDataAtom);
  const [, getCategories] = useAtom(categoriesPageActionsAtom);

  useEffect(() => {
    getCategories({ type: "GET" });
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
          <div className="d-flex flex-column gap-2 ps-3">
            {categoriesPageData &&
              categoriesPageData.map((category) => (
                <a
                  key={category._id}
                  className="bold submenu"
                  href={`/dashboard/categories/${category.slug}`}
                >
                  {category.title.toUpperCase()}
                </a>
              ))}
          </div>
        </div>
        <a className="bold" href="/dashboard/course">
          COURSE
        </a>
      </nav>
    </Col>
  );
};
