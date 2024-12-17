import axios from "axios";
import { useAtom } from "jotai";
import {
  aboutAtom,
  aboutDataAtom,
  isLoadingAtom,
  aboutActionsAtom,
} from "../stateManager/atom";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { CustomButton } from "../components/CustomButtons/CustomButton";
import { InputText } from "../components/Elements/InputText";
import { InputImg } from "../components/Elements/InputImg";
import { Dashboard } from "../components/Navbar/Dashboard";

export const AboutDashboard = () => {
  const [about] = useAtom(aboutAtom);
  const [aboutData] = useAtom(aboutDataAtom);
  const [loading] = useAtom(isLoadingAtom);
  const [, aboutCRUD] = useAtom(aboutActionsAtom);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await aboutCRUD({ type: "PATCH" });
    aboutCRUD({ type: "GET" });
  };

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    aboutCRUD({ type: "PATCH_FIELD", payload: { name, value } });
  };

  const handleChangeFile = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        aboutCRUD({
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
        aboutCRUD({
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
        aboutCRUD({
          type: "SET_LOADING",
          payload: false,
        });
      }
    }
  };

  useEffect(() => {
    aboutCRUD({ type: "GET" });
  }, []);

  return (
    <Container fluid>
      <Row>
        <Dashboard />
        <Col className="col flex-grow-1 p-6 grey-bg d-flex flex-column gap-5">
          <p className="bold lg">ABOUT DASHBOARD</p>
          <Container fluid>
            <Row className="d-flex flex-column gap-5">
              {/* ABOUT SECTION */}
              <Col className="pt-4 pb-2 px-4 lg-grey-bg d-flex flex-column gap-4">
                <p className="mid bold primary">ABOUT INFORMATION</p>
                <InputText
                  label="Title"
                  name="aboutTitle"
                  value={about.aboutTitle}
                  onChange={handleChangeInput}
                  rows={1}
                  description="Recommended 200 characters"
                  preview={aboutData.aboutTitle}
                />
                <InputText
                  label="Subtitle"
                  name="aboutSubtitle"
                  value={about.aboutSubtitle}
                  onChange={handleChangeInput}
                  rows={1}
                  description="Recommended 200 characters"
                  preview={aboutData.aboutSubtitle}
                />
                <InputText
                  label="Description"
                  name="aboutDescription"
                  value={about.aboutDescription}
                  onChange={handleChangeInput}
                  rows={14}
                  description="Recommended 800 characters"
                  preview={aboutData.aboutDescription}
                />
              </Col>

              {/* ABOUT IMAGE SECTION */}
              <Col className="pt-4 pb-3 px-4 lg-grey-bg d-flex flex-column gap-4">
                <p className="mid bold primary">ABOUT IMAGE</p>
                <InputImg
                  label="Select an Image"
                  name="aboutImage"
                  onChange={handleChangeFile}
                  description="Recommended size: 1920x700px"
                  preview={aboutData.aboutImage}
                  disabled={loading}
                />
              </Col>

              {/* CONTACT SECTION */}
              <Col className="pt-4 pb-2 px-4 lg-grey-bg d-flex flex-column gap-4">
                <p className="mid bold primary">CONTACT INFORMATION</p>
                <InputText
                  label="Title"
                  name="contactTitle"
                  value={about.contactTitle}
                  onChange={handleChangeInput}
                  rows={1}
                  description="Recommended 200 characters"
                  preview={aboutData.contactTitle}
                />
                <InputText
                  label="Subtitle"
                  name="contactSubtitle"
                  value={about.contactSubtitle}
                  onChange={handleChangeInput}
                  rows={1}
                  description="Recommended 200 characters"
                  preview={aboutData.contactSubtitle}
                />
                <InputText
                  label="Description"
                  name="contactDescription"
                  value={about.contactDescription}
                  onChange={handleChangeInput}
                  rows={14}
                  description="Recommended 800 characters"
                  preview={aboutData.contactDescription}
                />
              </Col>

              {/* CONTACT IMAGE SECTION */}
              <Col className="pt-4 pb-3 px-4 lg-grey-bg d-flex flex-column gap-4">
                <p className="mid bold primary">CONTACT IMAGE</p>
                <InputImg
                  label="Select an Image"
                  name="contactImage"
                  onChange={handleChangeFile}
                  description="Recommended size: 1920x700px"
                  preview={aboutData.contactImage}
                  disabled={loading}
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
