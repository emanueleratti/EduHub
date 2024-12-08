import { Container, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import {
  coursesPageAtom,
  coursesPageDataAtom,
  isLoadingAtom,
} from "../stateManager/atom";
import { handleError } from "../utility/errorHandler";
import { handleNotification } from "../utility/notificationHandler";
import { CustomButton } from "../components/CustomButtons/CustomButton";
import { InputText } from "../components/InputFields/InputText";
import { InputImg } from "../components/InputFields/InputImg";
import { Dashboard } from "../components/Navbar/Dashboard";

export const CoursesPageDashboard = () => {
  const [coursesPageData, setCoursesPageData] = useAtom(coursesPageDataAtom);
  const [coursesPage, setCoursesPage] = useAtom(coursesPageAtom);
  const [loading, setLoading] = useAtom(isLoadingAtom);

  const getCoursesPageData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/coursesPage`
      );
      setCoursesPage(response.data.coursesPage);
      setCoursesPageData(response.data.coursesPage);
    } catch (error) {
      handleError(error, "Errore durante il caricamento dei dati");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCoursesPageData();
  }, []);

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setCoursesPage({ ...coursesPage, [name]: value });
  };

  // const handleChangeFile = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       onChange(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_URL}/coursesPage/update`,
        coursesPage
      );
      setCoursesPageData(response.data.coursesPage);
      handleNotification("CoursesPage aggiornata correttamente!");
    } catch (error) {
      handleError(error, "Errore durante l'aggiornamento");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Dashboard />
        <Col className="col flex-grow-1 p-6 grey-bg d-flex flex-column gap-5">
          <p className="bold lg">COURSES DASHBOARD</p>
          <Container fluid>
            <Row className="d-flex flex-column gap-5">
              {/* HERO IMAGE SECTION */}
              <Col className="pt-4 pb-3 px-4 lg-grey-bg d-flex flex-column gap-4">
                <p className="mid bold primary">HERO IMAGE SECTION</p>
                <InputImg
                  label="Select an Image"
                  name="heroImage"
                  // onChange={handleChangeFile}
                  description="Recommended size: 1920x700px"
                  preview={coursesPageData.heroImage}
                  handleSubmit={handleSubmit}
                />
              </Col>

              {/* SLOGAN SECTION */}
              <Col className="pt-4 pb-2 px-4 lg-grey-bg d-flex flex-column gap-4">
                <p className="mid bold primary">SLOGAN SECTION</p>
                <InputText
                  label="Slogan Title "
                  name="sloganTitle"
                  value={coursesPage.sloganTitle}
                  onChange={handleChangeInput}
                  rows={2}
                  description="Recommended 200 characters"
                  preview={coursesPageData.sloganTitle}
                />
              </Col>

              {/* ICONS SECTION */}
              <Col className="pt-4 pb-2 px-4 lg-grey-bg d-flex flex-column gap-4">
                <p className="mid bold primary">ICONS SECTION</p>
                <InputText
                  label="First Icon Number"
                  name="iconFirstNumber"
                  value={coursesPage.iconFirstNumber}
                  onChange={handleChangeInput}
                  rows={1}
                  description="Recommended 200 characters"
                  preview={coursesPageData.iconFirstNumber}
                />
                <InputText
                  label="First Icon Title"
                  name="iconFirstTitle"
                  value={coursesPage.iconFirstTitle}
                  onChange={handleChangeInput}
                  rows={1}
                  description="Recommended 200 characters"
                  preview={coursesPageData.iconFirstTitle}
                />
                <InputText
                  label="Second Icon Number"
                  name="iconSecondNumber"
                  value={coursesPage.iconSecondNumber}
                  onChange={handleChangeInput}
                  rows={1}
                  description="Recommended 200 characters"
                  preview={coursesPageData.iconSecondNumber}
                />
                <InputText
                  label="Second Icon Title"
                  name="iconSecondTitle"
                  value={coursesPage.iconSecondTitle}
                  onChange={handleChangeInput}
                  rows={1}
                  description="Recommended 200 characters"
                  preview={coursesPageData.iconSecondTitle}
                />
                <InputText
                  label="Third Icon Number"
                  name="iconThirdNumber"
                  value={coursesPage.iconThirdNumber}
                  onChange={handleChangeInput}
                  rows={1}
                  description="Recommended 200 characters"
                  preview={coursesPageData.iconThirdNumber}
                />
                <InputText
                  label="Third Icon Title"
                  name="iconThirdTitle"
                  value={coursesPage.iconThirdTitle}
                  onChange={handleChangeInput}
                  rows={1}
                  description="Recommended 200 characters"
                  preview={coursesPageData.iconThirdTitle}
                />
              </Col>

              {/* FIRST SECTION */}
              <Col className="pt-4 pb-2 px-4 lg-grey-bg d-flex flex-column gap-4">
                <p className="mid bold primary">FIRST SECTION</p>
                <InputText
                  label="Subtitle"
                  name="firstSubtitle"
                  value={coursesPage.firstSubtitle}
                  onChange={handleChangeInput}
                  rows={1}
                  description="Recommended 200 characters"
                  preview={coursesPageData.firstSubtitle}
                />
                <InputText
                  label="Description"
                  name="firstDescription"
                  value={coursesPage.firstDescription}
                  onChange={handleChangeInput}
                  rows={14}
                  description="Recommended 800 characters"
                  preview={coursesPageData.firstDescription}
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
