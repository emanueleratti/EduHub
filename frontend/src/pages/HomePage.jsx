import React from "react";
import axios from "axios";
import { PageLayout } from "../layout/PageLayout";
import { Slider } from "../components/ImageContainer/Slider";
import { Container, Row, Col } from "react-bootstrap";
import { useAtom } from "jotai";
import { useEffect } from "react";
import {
  homePageDataAtom,
  homePageAtom,
  isLoadingAtom,
} from "../stateManager/atom";

export const HomePage = () => {
  const [homePageData, setHomePageData] = useAtom(homePageDataAtom);
  const [loading, setLoading] = useAtom(isLoadingAtom);

  const getHomePageData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_URL}/homePage`);
      setHomePageData(response.data.homePage);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  console.log(homePageData);

  useEffect(() => {
    getHomePageData();
  }, [setHomePageData]);

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
              <a
                href={homePageData?.ctaLink}
                className="btn lg bold btn-lg white gradient-bg mt-3"
              >
                {homePageData?.ctaButton}
              </a>
            </Col>
          </Row>
        </Container>
      </Container>
    </PageLayout>
  );
};
