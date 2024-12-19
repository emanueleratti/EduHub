import { useAtom } from "jotai";
import {
  categoriesPageDataAtom,
  categoriesPageActionsAtom,
  singleCoursePageDataAtom,
  singleCoursePageActionsAtom,
  isLoadingAtom,
} from "../stateManager/atom";
import { useEffect } from "react";
import { PageLayout } from "../layout/PageLayout";
import { Container, Row, Col } from "react-bootstrap";
import { Slider } from "../components/ImageContainer/Slider";
import { TitleLink } from "../components/Elements/TitleLink";
import { useParams } from "react-router-dom";
import { Loader } from "../components/Loader/Loader";

export const CategoriesPage = () => {
  const { category: categorySlug } = useParams();
  const [categoriesPageData] = useAtom(categoriesPageDataAtom);
  const [, getSingleCategory] = useAtom(categoriesPageActionsAtom);
  const [singleCoursePageData] = useAtom(singleCoursePageDataAtom);
  const [, getSingleCourse] = useAtom(singleCoursePageActionsAtom);
  const [isLoading] = useAtom(isLoadingAtom);

  const currentCategory = categoriesPageData?.find(
    (category) => category.slug === categorySlug && !category.isTemplate
  );

  const categoryCourses = currentCategory?._id
    ? singleCoursePageData?.filter(
        (course) => course.category._id === currentCategory._id
      )
    : [];

  useEffect(() => {
    getSingleCourse({ type: "GET" });
    getSingleCategory({ type: "GET" });
  }, []);

  if (!currentCategory || isLoading) {
    return (
      <PageLayout>
        <Loader />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* SLOGAN */}
      <Container fluid className="bg-black py-6">
        <Container>
          <Row>
            <Col className="col-12">
              <h1 className="white bold">
                <span style={{ fontWeight: 400 }}>
                  Corsi <br />
                </span>
                {currentCategory?.title}
              </h1>
            </Col>
          </Row>
        </Container>
      </Container>

      {/* FIRST DESCRIPTION */}
      <Container className="pt-6 pb-5">
        <Row>
          <Col className="col-12 d-flex flex-column gap-5">
            <h5>{currentCategory?.subtitle}</h5>
            <span className="line-small black-bg"></span>
            <p className="lg">{currentCategory?.description}</p>
          </Col>
        </Row>
      </Container>

      <Container className="pt-4 pb-7 d-flex flex-column">
        {categoryCourses.map((course, index) => (
          <TitleLink
            key={index}
            title={course.title}
            icon="ri-arrow-right-line"
            link={`/corsi/${categorySlug}/${course.slug}`}
          />
        ))}
      </Container>

      {/* GALLERY SLIDER */}
      <Slider images={currentCategory?.gallerySlider} />
    </PageLayout>
  );
};
