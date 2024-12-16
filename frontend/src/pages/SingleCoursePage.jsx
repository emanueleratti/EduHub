import { useAtom } from "jotai";
import {
  singleCoursePageDataAtom,
  singleCoursePageActionsAtom,
  categoriesPageDataAtom,
  categoriesPageActionsAtom,
  isLoadingAtom,
} from "../stateManager/atom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "../layout/PageLayout";
import { Container, Row, Col } from "react-bootstrap";
import { Cover } from "../components/ImageContainer/Cover";
import { TitleElement } from "../components/Elements/TitleElement";
import { Loader } from "../components/Loader/Loader";
import { TitleStatic } from "../components/Elements/TitleStatic";

export const SingleCoursePage = () => {
  const { course: courseSlug, category: categorySlug } = useParams();
  const [singleCoursePageData] = useAtom(singleCoursePageDataAtom);
  const [, getSingleCourse] = useAtom(singleCoursePageActionsAtom);
  const [categoriesPageData] = useAtom(categoriesPageDataAtom);
  const [, getSingleCategory] = useAtom(categoriesPageActionsAtom);
  const [isLoading] = useAtom(isLoadingAtom);

  const currentCategory = categoriesPageData?.find(
    (category) => category.slug === categorySlug && !category.isTemplate
  );

  const currentCourse = singleCoursePageData?.find(
    (course) =>
      course.slug === courseSlug &&
      course.category._id === currentCategory?._id &&
      !course.isTemplate
  );

  useEffect(() => {
    getSingleCourse({ type: "GET" });
    getSingleCategory({ type: "GET" });
  }, []);

  if (!currentCourse || !currentCategory || isLoading) {
    return (
      <PageLayout>
        <Loader />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* HERO IMAGE */}
      <Cover height="500px" image={currentCourse?.heroImage} />
      {/* SLOGAN */}
      <Container fluid className="py-6">
        <Container className="d-flex flex-column gap-6">
          <Row>
            <Col className="col-12">
              <h3>
                Corso <br />
                {currentCourse?.title}
              </h3>
            </Col>
          </Row>
          <Row>
            <Col className="col-9">
              <p className="lg black">{currentCourse?.description}</p>
            </Col>
            <Col className="col-3 d-flex flex-column gap-2 align-items-end">
              <p className="underline bold black">OFFERTA FORMATIVA</p>
              {currentCourse?.levels?.map((level, index) => (
                <p key={index} className="sm black text-end">
                  {<b>{level?.title.toUpperCase()}</b>}
                  <br />
                  {`SINGOLO ${level?.SINGLE?.price}€ / ${level?.SINGLE?.duration}`}
                  <br />
                  {`DI GRUPPO ${level?.GROUP?.price}€ / ${level?.GROUP?.duration}`}
                  <br />
                  {`SCONTO AMICO ${level?.FRIENDS?.price}€ / ${level?.FRIENDS?.duration}`}
                </p>
              ))}
            </Col>
          </Row>
        </Container>
      </Container>
      {/* HIGHLIGHTS TEXT */}
      <Container fluid className="lg-grey-bg py-6">
        <Container>
          <Row>
            <Col className="col-12 d-flex flex-column gap-4">
              <p className="black lg">{currentCourse?.highlightedText}</p>
            </Col>
          </Row>
        </Container>
      </Container>
      {/* COURSES  */}
      <Container className="py-7 d-flex flex-column">
        {currentCourse.levels?.map((level, index) => (
          <TitleElement
            key={index}
            title={level.title}
            icon="ri-add-fill"
            description={level?.description}
            programListTitle={level?.programListTitle}
            programFirstList={level?.programFirstListItems}
            programSecondList={level?.programSecondListItems}
            programThirdList={level?.programThirdListItems}
            singlePrice={level?.SINGLE?.price}
            singleDescription={level?.SINGLE?.description}
            singleDuration={level?.SINGLE?.duration}
            groupPrice={level?.GROUP?.price}
            groupDescription={level?.GROUP?.description}
            groupDuration={level?.GROUP?.duration}
            friendPrice={level?.FRIENDS?.price}
            friendDescription={level?.FRIENDS?.description}
            friendDuration={level?.FRIENDS?.duration}
          />
        ))}
        <TitleStatic title={`Personalizzato`} icon="ri-add-fill" />
      </Container>
      {/* GALLERY SLIDER */}
    </PageLayout>
  );
};
