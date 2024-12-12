import { useAtom } from "jotai";
import {
  categoriesPageDataAtom,
  categoriesPageActionsAtom,
} from "../stateManager/atom";
import { useEffect } from "react";
import { PageLayout } from "../layout/PageLayout";
import { Container, Row, Col } from "react-bootstrap";
import { Slider } from "../components/ImageContainer/Slider";

export const CategoriesPage = () => {
  const [categoriesPageData] = useAtom(categoriesPageDataAtom);
  const [, getCategories] = useAtom(categoriesPageActionsAtom);

  useEffect(() => {
    getCategories({ type: "GET" });
  }, []);

  return (
    <PageLayout>
      {/* SLOGAN */}
      <Container fluid className="bg-black py-6">
        <Container>
          <Row>
            <Col className="col-12 d-flex flex-column gap-5">
              <h1 className="white">{categoriesPageData?.titleExtended}</h1>
            </Col>
          </Row>
        </Container>
      </Container>

      {/* FIRST DESCRIPTION */}
      <Container className="py-6">
        <Row>
          <Col className="col-12 d-flex flex-column gap-5">
            <h5>{categoriesPageData?.subtitle}</h5>
            <span className="line-small black-bg"></span>
            <p className="lg">{categoriesPageData?.description}</p>
          </Col>
        </Row>
      </Container>

      {/* GALLERY SLIDER */}
      <Slider images={categoriesPageData?.gallerySlider} />
    </PageLayout>
  );
};
