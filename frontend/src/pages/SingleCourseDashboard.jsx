import { useAtom } from "jotai";
import {
  singleCoursePageDataAtom,
  singleCoursePageAtom,
  singleCoursePageActionsAtom,
  categoriesPageDataAtom,
  isLoadingAtom,
} from "../stateManager/atom";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { CustomButton } from "../components/CustomButtons/CustomButton";
import { NewInputText } from "../components/Elements/NewInputText";
import { NewInputImg } from "../components/Elements/NewInputImg";
import { NewSelect } from "../components/Elements/NewSelect";
import { CourseItem } from "../components/Elements/CourseItem";
import { CourseLevelItem } from "../components/Elements/CourseLevelItem";
import { Dashboard } from "../components/Navbar/Dashboard";
import { AddLevelButton } from "../components/Elements/AddLevelButton";

export const SingleCourseDashboard = () => {
  const [singleCoursePage] = useAtom(singleCoursePageAtom);
  const [singleCoursePageData] = useAtom(singleCoursePageDataAtom);
  const [categoriesPageData] = useAtom(categoriesPageDataAtom);
  const [loading] = useAtom(isLoadingAtom);
  const [, singleCourseCRUD] = useAtom(singleCoursePageActionsAtom);

  const placeholderData = singleCoursePageData.find(
    (course) => course.slug === "default"
  );

  const handleChangeInput = (event) => {
    const { name, value } = event.target;

    if (value === "DELETE_LEVEL") {
      const newLevels = [...singleCoursePage.levels];
      newLevels.splice(event.levelIndex, 1);
      singleCourseCRUD({
        type: "PATCH_FIELD",
        payload: { name: "levels", value: newLevels },
      });
    } else if (name.includes("levels[")) {
      const levelIndex = name.match(/\[(\d+)\]/)[1];
      const newLevels = [...singleCoursePage.levels];
      newLevels[levelIndex] = value;
      singleCourseCRUD({
        type: "PATCH_FIELD",
        payload: { name: "levels", value: newLevels },
      });
    } else {
      singleCourseCRUD({
        type: "PATCH_FIELD",
        payload: { name, value },
      });
    }
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    await singleCourseCRUD({
      type: "POST",
      payload: { courseData: singleCoursePage },
    });
    singleCourseCRUD({ type: "GET" });
  };

  const handleUpdate = async (id, updateData) => {
    await singleCourseCRUD({
      type: "PATCH",
      payload: { id, updateData },
    });
    singleCourseCRUD({ type: "GET" });
  };

  const handleDelete = async (id) => {
    await singleCourseCRUD({
      type: "DELETE",
      payload: { id },
    });
    singleCourseCRUD({ type: "GET" });
  };

  useEffect(() => {
    singleCourseCRUD({ type: "GET" });
  }, []);

  return (
    <Container fluid>
      <Row>
        <Dashboard />
        <Col className="col flex-grow-1 p-6 grey-bg d-flex flex-column gap-5">
          <p className="bold lg">SINGLE COURSE DASHBOARD</p>
          {singleCoursePageData.map((course, index) => (
            <CourseItem
              key={index}
              course={course}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              categories={categoriesPageData}
            />
          ))}

          <p className="bold lg">CREATE NEW COURSE</p>

          <Container fluid>
            <Row className="d-flex lg-grey-bg flex-wrap pt-4 pb-3 px-3 gy-4">
              <p className="mid bold primary">COURSE INFORMATION</p>

              <NewInputText
                label="Course Title"
                name="title"
                value={singleCoursePage.title}
                onChange={handleChangeInput}
                rows={1}
                placeholder={placeholderData?.title}
                description="Recommended 200 characters"
              />
              <NewInputText
                label="Course Title Extended"
                name="titleExtended"
                value={singleCoursePage.titleExtended}
                onChange={handleChangeInput}
                rows={1}
                placeholder={placeholderData?.titleExtended}
                description="Recommended 200 characters"
              />
              <NewInputText
                label="Course Slug"
                name="slug"
                value={singleCoursePage.slug}
                onChange={handleChangeInput}
                rows={1}
                placeholder={placeholderData?.slug}
                description="Recommended 200 characters"
              />
              <NewInputText
                label="Highlighted Text"
                name="highlightedText"
                value={singleCoursePage.highlightedText}
                onChange={handleChangeInput}
                rows={1}
                placeholder={placeholderData?.highlightedText}
                description="Recommended 200 characters"
              />
              <NewInputText
                label="Description"
                name="description"
                value={singleCoursePage.description}
                onChange={handleChangeInput}
                rows={4}
                col={12}
                placeholder={placeholderData?.description}
                description="Recommended 200 characters"
              />
              <NewSelect
                label="Categoria"
                name="category"
                value={singleCoursePage.category}
                onChange={handleChangeInput}
                options={categoriesPageData}
                description="Seleziona la categoria del corso"
                placeholder="Seleziona una categoria"
              />
              <NewInputImg
                label="Select image"
                name="heroImage"
                onChange={handleChangeInput}
                description="Recommended size: 1920x700px"
                preview={singleCoursePage.heroImage}
                placeholder={placeholderData?.heroImage}
              />
              <span className="line-small white-bg"></span>
              <p className="mid bold primary mt-4">COURSE LEVELS</p>
              {singleCoursePage.levels.map((level, index) => (
                <CourseLevelItem
                  key={index}
                  level={level}
                  levelIndex={index}
                  onChange={handleChangeInput}
                  templateLevel={placeholderData?.levels[0]}
                />
              ))}
              <AddLevelButton
                currentLevels={singleCoursePage.levels}
                onChange={handleChangeInput}
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
