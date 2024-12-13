import { useAtom } from "jotai";
import {
  coursePageDataAtom,
  coursePageAtom,
  coursePageActionsAtom,
  isLoadingAtom,
} from "../stateManager/atom";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { CustomButton } from "../components/CustomButtons/CustomButton";
import { NewInputText } from "../components/Elements/NewInputText";
import { NewInputImg } from "../components/Elements/NewInputImg";
import { CourseItem } from "../components/Elements/CourseItem";
import { CourseLevelItem } from "../components/Elements/CourseLevelItem";
import { Dashboard } from "../components/Navbar/Dashboard";

export const CourseDashboard = () => {
  const [coursePage] = useAtom(coursePageAtom);
  const [coursePageData] = useAtom(coursePageDataAtom);
  const [loading] = useAtom(isLoadingAtom);
  const [, courseCRUD] = useAtom(coursePageActionsAtom);
  const [levels, setLevels] = useState([]);

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    courseCRUD({
      type: "PATCH_FIELD",
      payload: {
        path: [name],
        value,
      },
    });
  };

  const handleAddLevel = () => {
    courseCRUD({
      type: "PATCH_FIELD",
      payload: {
        path: ["levels"],
        value: {
          title: "",
          description: "",
          programListTitle: "",
          programFirstListItems: [],
          programSecondListItems: [],
          programThirdListItems: [],
          GROUP: { price: "", duration: "", description: "" },
          SINGLE: { price: "", duration: "", description: "" },
          FRIENDS: { price: "", duration: "", description: "" },
        },
      },
    });
  };

  const handleUpdate = async (id, updateData) => {
    await courseCRUD({
      type: "PATCH",
      payload: { id, updateData },
    });
    courseCRUD({ type: "GET" });
  };

  const handleUpdateLevel = (levelData) => {
    setLevels((prevLevels) => [...prevLevels, levelData]);
    courseCRUD({
      type: "PATCH_FIELD",
      payload: {
        path: ["levels"],
        value: levels,
      },
    });
  };

  const handleDelete = async (id) => {
    await courseCRUD({
      type: "DELETE",
      payload: { id },
    });
    courseCRUD({ type: "GET" });
  };

  const handleDeleteLevel = (index) => {
    const filteredLevels = levels.filter((_, i) => i !== index);
    setLevels(filteredLevels);
    courseCRUD({
      type: "PATCH_FIELD",
      payload: {
        path: ["levels"],
        value: filteredLevels,
      },
    });
  };

  const handleCreate = async (event) => {
    event.preventDefault();

    const newCourseData = {
      slug: coursePage.slug,
      heroImage: coursePage.heroImage,
      title: coursePage.title,
      titleExtended: coursePage.titleExtended,
      description: coursePage.description,
      highlightedText: coursePage.highlightedText,
      levels: levels,
    };

    await courseCRUD({
      type: "POST",
      payload: { courseData: newCourseData },
    });
    courseCRUD({ type: "GET" });
  };

  useEffect(() => {
    courseCRUD({ type: "GET" });
  }, []);

  return (
    <Container fluid>
      <Row>
        <Dashboard />
        <Col className="col flex-grow-1 p-6 grey-bg d-flex flex-column gap-5">
          <p className="bold lg">COURSE DASHBOARD</p>
          {coursePageData.length > 0 ? (
            coursePageData.map((course, index) => (
              <CourseItem
                key={index}
                course={course}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
              />
            ))
          ) : (
            <p className="bold lg">Nessun corso trovato</p>
          )}

          <p className="bold lg">CREATE NEW COURSE</p>

          <Container fluid>
            <Row className="d-flex lg-grey-bg flex-wrap pt-4 pb-3 px-3 gy-4">
              {/* COURSE*/}
              <p className="mid bold primary">COURSE INFORMATION</p>
              <NewInputText
                label="Course Title"
                name="title"
                value={coursePage.title}
                onChange={handleChangeInput}
                rows={1}
                description="Recommended 200 characters"
              />
              <NewInputText
                label="Course Title Extended"
                name="titleExtended"
                value={coursePage.titleExtended}
                onChange={handleChangeInput}
                rows={1}
                description="Recommended 200 characters"
              />
              <NewInputText
                label="Course Slug"
                name="slug"
                value={coursePage.slug}
                onChange={handleChangeInput}
                rows={1}
                description="Recommended 200 characters"
              />
              <NewInputText
                label="Highlighted Text"
                name="highlightedText"
                value={coursePage.highlightedText}
                onChange={handleChangeInput}
                rows={1}
                description="Recommended 200 characters"
              />
              <NewInputText
                label="Description"
                name="description"
                value={coursePage.description}
                onChange={handleChangeInput}
                rows={10}
                description="Recommended 200 characters"
              />
              <NewInputImg
                label="Select image"
                name="heroImage"
                onChange={handleChangeInput}
                description="Recommended size: 1920x700px"
                preview={coursePage.heroImage}
              />

              <span className="line-small white-bg"></span>
              <p className="mid bold primary mt-4">COURSE LEVELS</p>
              {levels.map((level, index) => (
                <CourseLevelItem
                  key={index}
                  level={level}
                  handleUpdate={handleUpdateLevel}
                  handleDelete={() => handleDeleteLevel(index)}
                />
              ))}
              <CourseLevelItem handleUpdate={handleUpdateLevel} />
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
