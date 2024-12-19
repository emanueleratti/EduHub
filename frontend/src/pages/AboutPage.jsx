import { useAtom } from "jotai";
import { aboutDataAtom, aboutActionsAtom } from "../stateManager/atom";
import { useEffect } from "react";
import { PageLayout } from "../layout/PageLayout";
import { Container, Row, Col } from "react-bootstrap";
import { Cover } from "../components/ImageContainer/Cover";

export const AboutPage = () => {
  const [aboutData] = useAtom(aboutDataAtom);
  const [, getAbout] = useAtom(aboutActionsAtom);

  useEffect(() => {
    getAbout({ type: "GET" });
  }, []);

  return (
    <PageLayout>
      {/* ABOUT TITLE */}
      <Container fluid className="bg-black py-6">
        <Container>
          <Row>
            <Col className="col-12">
              <h3 className="white">
                <span className="bold">ARTC</span> Authorized Rhinoceros
                Training Center
              </h3>
            </Col>
          </Row>
        </Container>
      </Container>
      {/* ABOUT DESCRIPTION */}
      <Container className="py-6">
        <Row>
          <Col className="col-12 d-flex flex-column gap-5">
            <h5>{aboutData?.aboutSubtitle}</h5>
            <span className="line-small black-bg"></span>
            <p className="lg">{aboutData?.aboutDescription}</p>
          </Col>
        </Row>
      </Container>
      {/* ABOUT IMAGE */}
      <Cover
        desktopHeight="500px"
        mobileHeight="300px"
        image={aboutData?.aboutImage}
      />
    </PageLayout>
  );
};
