import { useAtom } from "jotai";
import { homePageDataAtom, homePageActionsAtom } from "../stateManager/atom";
import { useEffect } from "react";
import { PageLayout } from "../layout/PageLayout";
import { Container, Row, Col } from "react-bootstrap";
import { Slider } from "../components/ImageContainer/Slider";
import { CustomButton } from "../components/CustomButtons/CustomButton";

export const HomePage = () => {
  const [homePageData] = useAtom(homePageDataAtom);
  const [, getHomePage] = useAtom(homePageActionsAtom);

  useEffect(() => {
    getHomePage({ type: "GET" });
  }, []);

  return (
    <PageLayout className="first-section">
      <Slider height="700px" image={homePageData?.heroSlider} />
      <Container className="py-6">
        <Row>
          <Col className="col-12 d-flex flex-column gap-5 align-items-center">
            <p className="lg bold">{homePageData?.firstIncipit}</p>
            <img src={homePageData?.logo} alt="firstImage" />
            <p className="lg">{homePageData?.firstDescription}</p>
          </Col>
        </Row>
      </Container>
      <Container fluid className="bg-black py-6">
        <Container>
          <Row>
            <Col className="col-12 d-flex flex-column gap-5">
              <h5 className="white">{homePageData?.sloganSubtitle}</h5>
              <span className="line-small white-bg"></span>
              <h3 className="white">{homePageData?.sloganTitle}</h3>
            </Col>
          </Row>
        </Container>
      </Container>
      <Container className="py-6">
        <Row>
          <Col className="col-12">
            <p className="lg">{homePageData?.secondDescription}</p>
          </Col>
        </Row>
      </Container>
      <Container fluid className="scrollText pb-6 overflow-hidden">
        <Row>
          <Col className="col-12">
            <div className="scrolltext-container">
              <span className="scrolltext">{homePageData?.scrollText}</span>
            </div>
          </Col>
        </Row>
      </Container>
      <Container fluid className="grey-bg py-6">
        <Container>
          <Row>
            <Col className="col-12 d-flex flex-column gap-4 align-items-center">
              <h3 className="black">{homePageData?.ctaTitle}</h3>
              <p className="black lg text-center px-7">
                {homePageData?.ctaDescription}
              </p>
              <CustomButton size="lg" style="filled-gradient">
                {homePageData?.ctaButton}
              </CustomButton>
            </Col>
          </Row>
        </Container>
      </Container>
    </PageLayout>
  );
};
