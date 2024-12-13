import { useAtom } from "jotai";
import {
  coursePageDataAtom,
  coursePageActionsAtom,
} from "../stateManager/atom";
import { useEffect } from "react";
import { PageLayout } from "../layout/PageLayout";
import { Container, Row, Col } from "react-bootstrap";
import { Cover } from "../components/ImageContainer/Cover";
import { TitleLink } from "../components/Elements/TitleLink";

export const CoursePage = () => {
  const [coursePageData] = useAtom(coursePageDataAtom);
  const [, getCourse] = useAtom(coursePageActionsAtom);

  useEffect(() => {
    getCourse({ type: "GET" });
  }, []);

  console.log(coursePageData[0].levels.title);
  return (
    <PageLayout>
      {/* HERO IMAGE */}
      <Cover height="500px" image={coursePageData[0]?.heroImage} />
      {/* SLOGAN */}
      <Container fluid className="py-6">
        <Container>
          <Row>
            <Col className="col-12 d-flex flex-column gap-5">
              <h3 className="black">{coursePageData[0]?.titleExtended}</h3>
              <p className="lg black">{coursePageData[0]?.description}</p>
            </Col>
          </Row>
        </Container>
      </Container>
      {/* HIGHLIGHTS TEXT */}
      <Container fluid className="lg-grey-bg py-6">
        <Container>
          <Row>
            <Col className="col-12 d-flex flex-column gap-4">
              <p className="black lg">{coursePageData[0]?.highlightedText}</p>
            </Col>
          </Row>
        </Container>
      </Container>
      {/* COURSES  */}
      <Container className="py-7 d-flex flex-column">
        <TitleLink
          // key={index}
          title={coursePageData[0].levels.title}
          icon="ri-add-fill"
          // link={`/corsi/${level.slug}`}
        />
        <TitleLink
          // key={index}
          title={`Livello 2`}
          icon="ri-add-fill"
          // link={`/corsi/${level.slug}`}
        />
        <TitleLink
          // key={index}
          title={`Personalizzato`}
          icon="ri-add-fill"
          // link={`/corsi/${level.slug}`}
        />
      </Container>
      {/* GALLERY SLIDER */}
    </PageLayout>
  );
};
