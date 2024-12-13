import { useAtom } from "jotai";
import {
  homePageDataAtom,
  homePageAtom,
  homePageActionsAtom,
  isLoadingAtom,
} from "../stateManager/atom";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { CustomButton } from "../components/CustomButtons/CustomButton";
import { InputText } from "../components/Elements/InputText";
import { InputImg } from "../components/Elements/InputImg";
import { Dashboard } from "../components/Navbar/Dashboard";

export const HomeDashboard = () => {
  const [homePage] = useAtom(homePageAtom);
  const [homePageData] = useAtom(homePageDataAtom);
  const [loading] = useAtom(isLoadingAtom);
  const [, homeCRUD] = useAtom(homePageActionsAtom);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await homeCRUD({ type: "PATCH" });
    homeCRUD({ type: "GET" });
  };

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    homeCRUD({ type: "PATCH_FIELD", payload: { name, value } });
  };

  useEffect(() => {
    homeCRUD({ type: "GET" });
  }, []);

  return (
    <Container fluid>
      <Row>
        <Dashboard />
        <Col className="col flex-grow-1 p-6 grey-bg d-flex flex-column gap-5">
          <p className="bold lg">HOMEPAGE DASHBOARD</p>
          <Container fluid>
            <Row className="d-flex flex-column gap-5">
              {/* HERO SLIDER SECTION */}
              <Col className="pt-4 pb-3 px-4 lg-grey-bg d-flex flex-column gap-4">
                <p className="mid bold primary">HERO SLIDER SECTION</p>
                <InputImg
                  label="Select Images"
                  name="heroSlider"
                  // onChange={handleChangeFile}
                  description="Recommended size: 1920x700px"
                  preview={homePageData.heroSlider}
                  handleSubmit={handleSubmit}
                />
              </Col>
              {/* FIRST SECTION */}
              <Col className="pt-4 pb-2 px-4 lg-grey-bg d-flex flex-column gap-4">
                <p className="mid bold primary">FIRST SECTION</p>
                <InputText
                  label="Incipit"
                  name="firstIncipit"
                  value={homePage.firstIncipit}
                  onChange={handleChangeInput}
                  rows={5}
                  description="Recommended 200 characters"
                  preview={homePageData.firstIncipit}
                />
                <InputImg
                  label="Upload Logo Image"
                  name="logo"
                  // onChange={handleChangeFile}
                  description="Recommended size: 300x200px"
                  preview={homePageData.logo}
                  handleSubmit={handleSubmit}
                />
                <InputText
                  label="Description"
                  name="firstDescription"
                  value={homePage.firstDescription}
                  onChange={handleChangeInput}
                  rows={10}
                  description="Recommended 800 characters"
                  preview={homePageData.firstDescription}
                />
              </Col>
              {/* SLOGAN SECTION */}
              <Col className="pt-4 pb-2 px-4 lg-grey-bg d-flex flex-column gap-4">
                <p className="mid bold primary">SLOGAN SECTION</p>
                <InputText
                  label="Subtitle "
                  name="sloganSubtitle"
                  value={homePage.sloganSubtitle}
                  onChange={handleChangeInput}
                  rows={1}
                  description="Recommended 200 characters"
                  preview={homePageData.sloganSubtitle}
                />
                <InputText
                  label="Title"
                  name="sloganTitle"
                  value={homePage.sloganTitle}
                  onChange={handleChangeInput}
                  rows={1}
                  description="Recommended 200 characters"
                  preview={homePageData.sloganTitle}
                />
              </Col>
              {/* SECOND SECTION */}
              <Col className="pt-4 pb-2 px-4 lg-grey-bg d-flex flex-column gap-4">
                <p className="mid bold primary">SECOND SECTION</p>
                <InputText
                  label="Description"
                  name="secondDescription"
                  value={homePage.secondDescription}
                  onChange={handleChangeInput}
                  rows={10}
                  description="Recommended 800 characters"
                  preview={homePageData.secondDescription}
                />
              </Col>

              {/* SCROLL SECTION */}
              <Col className="pt-4 pb-2 px-4 lg-grey-bg d-flex flex-column gap-4">
                <p className="mid bold primary">SCROLL SECTION</p>
                <InputText
                  label="Text"
                  name="scrollText"
                  value={homePage.scrollText}
                  onChange={handleChangeInput}
                  rows={1}
                  description="Recommended 100 characters"
                  preview={homePageData.scrollText}
                />
              </Col>

              {/* CTA SECTION */}
              <Col className="pt-4 pb-2 px-4 lg-grey-bg d-flex flex-column gap-4">
                <p className="mid bold primary">CTA SECTION</p>
                <InputText
                  label="Title"
                  name="ctaTitle"
                  value={homePage.ctaTitle}
                  onChange={handleChangeInput}
                  rows={1}
                  description="Recommended 100 characters"
                  preview={homePageData.ctaTitle}
                />
                <InputText
                  label="Description"
                  name="ctaDescription"
                  value={homePage.ctaDescription}
                  onChange={handleChangeInput}
                  rows={4}
                  description="Recommended 400 characters"
                  preview={homePageData.ctaDescription}
                />
                <InputText
                  label="Button"
                  name="ctaButton"
                  value={homePage.ctaButton}
                  onChange={handleChangeInput}
                  rows={1}
                  description="Recommended 100 characters"
                  preview={homePageData.ctaButton}
                />
                <InputText
                  label="Link"
                  name="ctaLink"
                  value={homePage.ctaLink}
                  onChange={handleChangeInput}
                  rows={1}
                  description="Recommended 100 characters"
                  preview={homePageData.ctaLink}
                />
              </Col>
            </Row>
          </Container>
          <CustomButton
            size="lg"
            style="filled-gradient"
            onClick={handleSubmit}
            disabled={loading}
            type="submit"
          >
            {loading ? "Caricamento..." : "Salva"}
          </CustomButton>
        </Col>
      </Row>
    </Container>
  );
};
