import axios from "axios";
import { useAtom } from "jotai";
import {
  categoriesPageDataAtom,
  categoriesPageAtom,
  categoriesPageActionsAtom,
  isLoadingAtom,
} from "../stateManager/atom";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { CustomButton } from "../components/CustomButtons/CustomButton";
import { NewInputText } from "../components/Elements/NewInputText";
import { NewInputImg } from "../components/Elements/NewInputImg";
import { CategoryItem } from "../components/Elements/CategoryItem";
import { Dashboard } from "../components/Navbar/Dashboard";

export const CategoriesDashboard = () => {
  const [categoriesPage] = useAtom(categoriesPageAtom);
  const [categoriesPageData] = useAtom(categoriesPageDataAtom);
  const [loading] = useAtom(isLoadingAtom);
  const [, categoriesCRUD] = useAtom(categoriesPageActionsAtom);

  const placeholderData = categoriesPageData.find(
    (category) => category.slug === "default"
  );

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    categoriesCRUD({
      type: "PATCH_FIELD",
      payload: { name, value },
    });
  };

  const handleChangeFile = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        categoriesCRUD({
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
        categoriesCRUD({
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
        categoriesCRUD({
          type: "SET_LOADING",
          payload: false,
        });
      }
    }
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    await categoriesCRUD({
      type: "POST",
      payload: { categoryData: categoriesPage },
    });
    categoriesCRUD({ type: "GET" });
  };

  const handleUpdate = async (id, updateData) => {
    await categoriesCRUD({
      type: "PATCH",
      payload: { id, updateData },
    });
    categoriesCRUD({ type: "GET" });
  };

  const handleDelete = async (id) => {
    await categoriesCRUD({
      type: "DELETE",
      payload: { id },
    });
    categoriesCRUD({ type: "GET" });
  };

  useEffect(() => {
    categoriesCRUD({ type: "GET" });
  }, []);

  return (
    <Container fluid>
      <Row>
        <Dashboard />
        <Col className="col flex-grow-1 p-6 grey-bg d-flex flex-column gap-5">
          <p className="bold lg">CATEGORIES DASHBOARD</p>
          {categoriesPageData.map((category, index) => (
            <CategoryItem
              key={index}
              category={category}
              slug={category.slug}
              id={category._id}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          ))}

          <p className="bold lg">CREATE NEW CATEGORY</p>

          <Container fluid>
            <Row className="d-flex lg-grey-bg flex-wrap p-4 px-3 gy-4">
              {/* CATEGORIES*/}
              <p className="mid bold primary">CATEGORY INFORMATION</p>
              <NewInputText
                label="Slug"
                name="slug"
                value={categoriesPage.slug}
                onChange={handleChangeInput}
                rows={1}
                description="Recommended 200 characters"
                placeholder={placeholderData?.slug}
              />
              <NewInputText
                label="Title"
                name="title"
                value={categoriesPage.title}
                onChange={handleChangeInput}
                rows={1}
                description="Recommended 200 characters"
                placeholder={placeholderData?.title}
              />
              <NewInputText
                label="Title Extended"
                name="titleExtended"
                value={categoriesPage.titleExtended}
                onChange={handleChangeInput}
                rows={1}
                description="Recommended 200 characters"
                placeholder={placeholderData?.titleExtended}
              />
              <NewInputText
                label="Subtitle"
                name="subtitle"
                value={categoriesPage.subtitle}
                onChange={handleChangeInput}
                rows={1}
                description="Recommended 200 characters"
                placeholder={placeholderData?.subtitle}
              />
              <NewInputText
                label="Description"
                name="description"
                value={categoriesPage.description}
                onChange={handleChangeInput}
                rows={6}
                description="Recommended 200 characters"
                placeholder={placeholderData?.description}
              />
              <NewInputImg
                label="Select images"
                name="gallerySlider"
                onChange={handleChangeFile}
                description="Recommended size: 1920x700px"
                preview={categoriesPageData.gallerySlider}
                disabled={loading}
              />
            </Row>
          </Container>
          <CustomButton
            size="lg"
            style="filled-gradient"
            onClick={handleCreate}
            disabled={loading}
            type="submit"
          >
            {loading ? "Caricamento..." : "Crea"}
          </CustomButton>
        </Col>
      </Row>
    </Container>
  );
};
