import { useAtom } from "jotai";
import {
  categoriesPageDataAtom,
  categoriesPageActionsAtom,
  currentCategoryAtom,
  coursesPageDataAtom,
} from "../stateManager/atom";
import { useEffect } from "react";
import { PageLayout } from "../layout/PageLayout";
import { Container, Row, Col } from "react-bootstrap";
import { Slider } from "../components/ImageContainer/Slider";
import { TitleLink } from "../components/Elements/TitleLink";
import { useParams } from "react-router-dom";
export const CategoriesPage = () => {
  const { slug } = useParams();
  const [categoriesPageData] = useAtom(categoriesPageDataAtom);
  const [currentCategory] = useAtom(currentCategoryAtom);
  const [coursesPageData] = useAtom(coursesPageDataAtom);
  const [, categoriesCRUD] = useAtom(categoriesPageActionsAtom);
  const [, coursesCRUD] = useAtom(coursesPageActionsAtom);

  useEffect(() => {
    if (slug) {
      categoriesCRUD({
        type: "GET_BY_SLUG",
        payload: { slug },
      });
    }
    coursesCRUD({
      type: "GET",
    });
  }, [slug]);

  console.log(coursesPageData);

  return (
    <PageLayout>
      {/* SLOGAN */}
      <Container fluid className="bg-black py-6">
        <Container>
          <Row>
            <Col className="col-12 d-flex flex-column gap-5">
              <h1 className="white bold">
                <span style={{ fontWeight: 300 }}>
                  Corsi <br />
                </span>
                {currentCategory?.title}
              </h1>
            </Col>
          </Row>
        </Container>
      </Container>

      {/* FIRST DESCRIPTION */}
      <Container className="py-6">
        <Row>
          <Col className="col-12 d-flex flex-column gap-5">
            <h5>{currentCategory?.subtitle}</h5>
            <span className="line-small black-bg"></span>
            <p className="lg">{currentCategory?.description}</p>
          </Col>
        </Row>
      </Container>

      <Container className="pb-7 d-flex flex-column">
        {/* {currentCategory?.courses.map((category, index) => (
          <TitleLink
            key={index}
            title={course.title}
            icon="ri-arrow-right-line"
            link={`/corsi/${course.slug}`}
          />
        ))} */}
      </Container>

      {/* GALLERY SLIDER */}
      <Slider images={currentCategory?.gallerySlider} />
    </PageLayout>
  );
};
