import React from "react";
import axios from "axios";
import { PageLayout } from "../layout/PageLayout";
import { Container, Row, Col } from "react-bootstrap";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { coursesPageDataAtom } from "../stateManager/atom";
import { TitleLink } from "../components/Elements/TitleLink";
import { Cover } from "../components/ImageContainer/Cover";

export const CoursesPage = () => {
  const [coursesPageData, setCoursesPageData] = useAtom(coursesPageDataAtom);

  const getCoursesPageData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/coursesPage`
      );
      setCoursesPageData(response.data.coursesPage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCoursesPageData();
  }, [setCoursesPageData]);

  return (
    <PageLayout>
      {/* HERO IMAGE */}
      <Cover height="500px" image={coursesPageData?.heroImage} />

      {/* SLOGAN */}
      <Container fluid className="bg-black py-6">
        <Container>
          <Row>
            <Col className="col-12 d-flex flex-column gap-5">
              <h3 className="white">{coursesPageData?.sloganTitle}</h3>
            </Col>
          </Row>
        </Container>
      </Container>

      {/* ICONS */}
      <Container className="pt-6">
        <Row>
          <Col className="col-4 text-center d-flex flex-column gap-2">
            <h1 className="black bold">{coursesPageData?.iconFirstNumber}</h1>
            <h4 className="black">{coursesPageData?.iconFirstTitle}</h4>
          </Col>
          <Col className="col-4 text-center d-flex flex-column gap-2">
            <h1 className="black bold">{coursesPageData?.iconSecondNumber}</h1>
            <h4 className="black">{coursesPageData?.iconSecondTitle}</h4>
          </Col>
          <Col className="col-4 text-center d-flex flex-column gap-2">
            <h1 className="black bold">{coursesPageData?.iconThirdNumber}</h1>
            <h4 className="black">{coursesPageData?.iconThirdTitle}</h4>
          </Col>
        </Row>
      </Container>

      {/* FIRST DESCRIPTION */}
      <Container className="py-6">
        <Row>
          <Col className="col-12 d-flex flex-column gap-5">
            <h5>{coursesPageData?.firstSubtitle}</h5>
            <span className="line-small black-bg"></span>
            <p className="lg">{coursesPageData?.firstDescription}</p>
          </Col>
        </Row>
      </Container>

      {/* CATEGORIES */}
      <Container className="pb-7 d-flex flex-column">
        <TitleLink title={"Standard"} icon="ri-arrow-right-line" link="#" />
        <TitleLink title={"Standard"} icon="ri-arrow-right-line" link="#" />
        <TitleLink title={"Standard"} icon="ri-arrow-right-line" link="#" />
        <TitleLink title={"Standard"} icon="ri-arrow-right-line" link="#" />
      </Container>

      {/* GALLERY SLIDER */}
    </PageLayout>
  );
};
