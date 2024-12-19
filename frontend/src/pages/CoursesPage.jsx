import { useAtom } from "jotai";
import {
  coursesPageDataAtom,
  coursesPageActionsAtom,
  categoriesPageDataAtom,
  categoriesPageActionsAtom,
} from "../stateManager/atom";
import { useEffect } from "react";
import { PageLayout } from "../layout/PageLayout";
import { Container, Row, Col } from "react-bootstrap";
import { Cover } from "../components/ImageContainer/Cover";
import { TitleLink } from "../components/Elements/TitleLink";

export const CoursesPage = () => {
  const [coursesPageData] = useAtom(coursesPageDataAtom);
  const [categoriesPageData] = useAtom(categoriesPageDataAtom);
  const [, getCourses] = useAtom(coursesPageActionsAtom);
  const [, getCategories] = useAtom(categoriesPageActionsAtom);

  useEffect(() => {
    getCourses({ type: "GET" });
    getCategories({ type: "GET" });
  }, []);

  return (
    <PageLayout>
      {/* HERO IMAGE */}
      <Cover
        desktopHeight="500px"
        mobileHeight="300px"
        image={coursesPageData?.heroImage}
      />
      {/* SLOGAN */}
      <Container fluid className="bg-black py-6">
        <Container>
          <Row>
            <Col className="col-12">
              <h3 className="white">{coursesPageData?.sloganTitle}</h3>
            </Col>
          </Row>
        </Container>
      </Container>
      {/* ICONS */}
      <Container className="pt-6">
        <Row>
          <Col className="col-4 text-lg-center d-flex flex-column gap-2">
            <h1 className="black bold">{coursesPageData?.iconFirstNumber}</h1>
            <h4 className="black">{coursesPageData?.iconFirstTitle}</h4>
          </Col>
          <Col className="col-4 text-lg-center d-flex flex-column gap-2">
            <h1 className="black bold">{coursesPageData?.iconSecondNumber}</h1>
            <h4 className="black">{coursesPageData?.iconSecondTitle}</h4>
          </Col>
          <Col className="col-4 text-lg-center d-flex flex-column gap-2">
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
      <Container className="pt-3 pb-7 d-flex flex-column">
        {categoriesPageData.map((category, index) => (
          <TitleLink
            key={index}
            title={category.title}
            icon="ri-arrow-right-line"
            link={`/corsi/${category.slug}`}
          />
        ))}
      </Container>
      {/* GALLERY SLIDER */}
    </PageLayout>
  );
};
