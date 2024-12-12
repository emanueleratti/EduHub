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
import { InputText } from "../components/InputFields/InputText";
import { NewInputText } from "../components/InputFields/NewInputText";
import { InputImg } from "../components/InputFields/InputImg";
import { CategoryItem } from "../components/Elements/CategoryItem";
import { Dashboard } from "../components/Navbar/Dashboard";

export const CategoriesDashboard = () => {
  const [categoriesPage] = useAtom(categoriesPageAtom);
  const [categoriesPageData] = useAtom(categoriesPageDataAtom);
  const [loading] = useAtom(isLoadingAtom);
  const [, categoriesCRUD] = useAtom(categoriesPageActionsAtom);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await categoriesCRUD({ type: "PATCH" });
    categoriesCRUD({ type: "GET" });
  };

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    categoriesCRUD({ type: "PATCH_FIELD", payload: { name, value } });
  };

  const handleCreate = async (categoryData) => {
    await categoriesCRUD({
      type: "POST",
      payload: { categoryData },
    });
  };

  const handleUpdate = async (id, updateData) => {
    await categoriesCRUD({
      type: "PATCH",
      payload: { id, updateData },
    });
  };

  const handleDelete = async (id) => {
    await categoriesCRUD({
      type: "DELETE",
      payload: { id },
    });
  };

  useEffect(() => {
    categoriesCRUD({ type: "GET" });
  }, []);

  console.log(categoriesPage);

  return (
    <Container fluid>
      <Row>
        <Dashboard />
        <Col className="col flex-grow-1 p-6 grey-bg d-flex flex-column gap-5">
          <p className="bold lg">CATEGORIES DASHBOARD</p>
          {categoriesPage.map((category) => (
            <CategoryItem title={category.title} />
          ))}
          <p className="bold lg">CREATE NEW CATEGORY</p>
          <Container fluid>
            <Row className="d-flex flex-column gap-5">
              {/* CATEGORIES*/}
              <Col className="pt-4 pb-2 px-4 lg-grey-bg d-flex flex-column gap-4">
                <p className="mid bold primary">SLUG</p>
                <NewInputText
                  label="Slug"
                  name="slug"
                  value={categoriesPage.slug}
                  onChange={handleChangeInput}
                  rows={1}
                  description="Recommended 200 characters"
                  preview={categoriesPageData.slug}
                />
                <NewInputText
                  label="Slug"
                  name="slug"
                  value={categoriesPage.slug}
                  onChange={handleChangeInput}
                  rows={1}
                  description="Recommended 200 characters"
                  preview={categoriesPageData.slug}
                />
                <InputText
                  label="Title"
                  name="title"
                  value={categoriesPage.title}
                  onChange={handleChangeInput}
                  rows={1}
                  description="Recommended 200 characters"
                  preview={categoriesPageData.title}
                />
                <InputText
                  label="Title Extended"
                  name="titleExtended"
                  value={categoriesPage.titleExtended}
                  onChange={handleChangeInput}
                  rows={1}
                  description="Recommended 200 characters"
                  preview={categoriesPageData.titleExtended}
                />
                <InputText
                  label="Subtitle"
                  name="subtitle"
                  value={categoriesPage.subtitle}
                  onChange={handleChangeInput}
                  rows={1}
                  description="Recommended 200 characters"
                  preview={categoriesPageData.subtitle}
                />
                <InputText
                  label="Description"
                  name="description"
                  value={categoriesPage.description}
                  onChange={handleChangeInput}
                  rows={1}
                  description="Recommended 200 characters"
                  preview={categoriesPageData.description}
                />
                <InputImg
                  label="Select images"
                  name="gallerySlider"
                  onChange={handleChangeInput}
                  description="Recommended size: 1920x700px"
                  preview={categoriesPageData.gallerySlider || ""}
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
            {loading ? "Caricamento..." : "Crea"}
          </CustomButton>
        </Col>
      </Row>
    </Container>
  );
};
