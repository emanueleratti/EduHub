import axios from "axios";
import { useAtom } from "jotai";
import {
  coursesPageAtom,
  coursesPageDataAtom,
  isLoadingAtom,
  coursesPageActionsAtom,
} from "../stateManager/atom";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { CustomButton } from "../components/CustomButtons/CustomButton";
import { InputText } from "../components/Elements/InputText";
import { InputImg } from "../components/Elements/InputImg";
import { Dashboard } from "../components/Navbar/Dashboard";

export const CoursesDashboard = () => {
  const [coursesPage] = useAtom(coursesPageAtom);
  const [coursesPageData] = useAtom(coursesPageDataAtom);
  const [loading] = useAtom(isLoadingAtom);
  const [, coursesCRUD] = useAtom(coursesPageActionsAtom);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await coursesCRUD({ type: "PATCH" });
    coursesCRUD({ type: "GET" });
  };

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    coursesCRUD({ type: "PATCH_FIELD", payload: { name, value } });
  };

  const handleChangeFile = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        coursesCRUD({
          type: "SET_LOADING",
          payload: true,
        });

        const formData = new FormData();
        formData.append("image", file);

        const response = await axios.post(
          "http://localhost:4040/upload/cloud",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const name = event.target.name;
        coursesCRUD({
          type: "PATCH_FIELD",
          payload: {
            name,
            value: response.data.img,
          },
        });
      } catch (error) {
        console.error("Errore nel caricamento del file:", error);
        const errorMessage =
          error.response?.data?.message || "Errore nel caricamento del file";
        alert(errorMessage);
      } finally {
        coursesCRUD({
          type: "SET_LOADING",
          payload: false,
        });
      }
    }
  };

  useEffect(() => {
    coursesCRUD({ type: "GET" });
  }, []);

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
                  onChange={handleChangeFile}
                  description="Recommended size: 1920x700px"
                  preview={coursesPageData.heroImage}
                  disabled={loading}
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
