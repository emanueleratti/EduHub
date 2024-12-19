import { useAtom } from "jotai";
import { aboutDataAtom, aboutActionsAtom } from "../stateManager/atom";
import { useEffect } from "react";
import { PageLayout } from "../layout/PageLayout";
import { Container, Row, Col } from "react-bootstrap";
import { Cover } from "../components/ImageContainer/Cover";

export const ContactPage = () => {
  const [aboutData] = useAtom(aboutDataAtom);
  const [, getAbout] = useAtom(aboutActionsAtom);

  useEffect(() => {
    getAbout({ type: "GET" });
  }, []);

  return (
    <PageLayout>
      {/* CONTACT TITLE */}
      <Container fluid className="bg-black py-6">
        <Container>
          <Row>
            <Col className="col-12">
              <h3 className="white">
                <span className="bold">Let's Keep</span>
                <br />
                in Touch
              </h3>
            </Col>
          </Row>
        </Container>
      </Container>
      {/* CONTACT DESCRIPTION */}
      <Container className="py-6">
        <Row>
          <Col className="col-12 d-flex flex-column gap-5">
            <h5>{aboutData?.contactSubtitle}</h5>
            <span className="line-small black-bg"></span>
            <p className="lg">{aboutData?.contactDescription}</p>
          </Col>
        </Row>
      </Container>
      {/* CONTACT IMAGE */}
      <Cover
        desktopHeight="500px"
        mobileHeight="300px"
        image={aboutData?.contactImage}
      />
    </PageLayout>
  );
};
