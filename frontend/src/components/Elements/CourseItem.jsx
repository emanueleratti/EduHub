import axios from "axios";
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { CustomButton } from "../CustomButtons/CustomButton";
import { NewInputText } from "./NewInputText";
import { NewInputImg } from "./NewInputImg";
import { NewSelect } from "./NewSelect";
import { CourseLevelItem } from "./CourseLevelItem";
import { AddLevelButton } from "./AddLevelButton";
import { isLoadingAtom } from "../../stateManager/atom";
import { useAtom } from "jotai";
import { coursesPageActionsAtom } from "../../stateManager/atom";

export const CourseItem = ({
  course,
  handleDelete,
  handleUpdate,
  categories,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updateCourse, setUpdateCourse] = useState(course);
  const [, coursesCRUD] = useAtom(coursesPageActionsAtom);
  const [loading] = useAtom(isLoadingAtom);

  const handleChangeInput = (event) => {
    const { name, value } = event.target;

    if (value === "DELETE_LEVEL") {
      const newLevels = [...updateCourse.levels];
      newLevels.splice(event.levelIndex, 1);
      setUpdateCourse((prev) => ({
        ...prev,
        levels: newLevels,
      }));
    } else if (name.includes("levels[")) {
      const levelIndex = name.match(/\[(\d+)\]/)[1];
      const newLevels = [...updateCourse.levels];
      newLevels[levelIndex] = value;
      setUpdateCourse((prev) => ({
        ...prev,
        levels: newLevels,
      }));
    } else {
      setUpdateCourse((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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

  const handleSubmit = async () => {
    try {
      await handleUpdate(course._id, updateCourse);
      setIsEditing(false);
    } catch (error) {
      console.error("Submit update error:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
    setUpdateCourse(course);
  };

  return (
    <Container fluid>
      <Row className="d-flex flex-column gap-5">
        <Col className="py-3 px-4 lg-grey-bg d-flex justify-content-between align-items-center">
          <div className="d-flex gap-3 flex-column">
            <p className="sm bold secondary">COURSE</p>
            <p className="mid bold primary">{course.title.toUpperCase()}</p>
          </div>
          <div className="d-flex gap-3 pt-2">
            {isEditing && (
              <CustomButton
                size="sm"
                style="filled-gradient"
                onClick={handleSubmit}
              >
                Update
              </CustomButton>
            )}
            <CustomButton
              size="sm"
              style="filled-black"
              disabled={false}
              onClick={handleEdit}
            >
              {isEditing ? "Cancel" : "Edit"}
            </CustomButton>
            <CustomButton
              size="sm"
              style="filled-black"
              onClick={() => handleDelete(course._id)}
              disabled={false}
            >
              Delete
            </CustomButton>
          </div>
        </Col>
      </Row>

      {isEditing && (
        <Row className="d-flex lg-grey-bg flex-wrap pb-4 px-3 gy-4">
          <NewInputText
            label="Slug"
            name="slug"
            value={updateCourse.slug}
            onChange={handleChangeInput}
            rows={1}
            description="Recommended 200 characters"
          />
          <NewInputText
            label="Title"
            name="title"
            value={updateCourse.title}
            onChange={handleChangeInput}
            rows={1}
            description="Recommended 200 characters"
          />
          <NewInputText
            label="Title Extended"
            name="titleExtended"
            value={updateCourse.titleExtended}
            onChange={handleChangeInput}
            rows={1}
            description="Recommended 200 characters"
          />
          <NewInputText
            label="Highlighted Text"
            name="highlightedText"
            value={updateCourse.highlightedText}
            onChange={handleChangeInput}
            rows={1}
            description="Recommended 200 characters"
          />
          <NewInputText
            label="Description"
            name="description"
            value={updateCourse.description}
            onChange={handleChangeInput}
            rows={4}
            col={12}
            description="Recommended 200 characters"
          />
          <NewSelect
            label="Categoria"
            name="category"
            value={updateCourse.category}
            onChange={handleChangeInput}
            options={categories}
            description="Seleziona la categoria del corso"
            placeholder="Seleziona una categoria"
          />
          <NewInputImg
            label="Hero Image"
            name="heroImage"
            onChange={handleChangeFile}
            description="Recommended size: 1920x700px"
            preview={updateCourse.heroImage}
            disabled={loading}
          />

          <span className="line-small white-bg"></span>
          <p className="mid bold primary mt-4">COURSE LEVELS</p>
          {updateCourse.levels.map((level, index) => (
            <CourseLevelItem
              key={index}
              level={level}
              levelIndex={index}
              onChange={handleChangeInput}
            />
          ))}
          <AddLevelButton
            currentLevels={updateCourse.levels}
            onChange={handleChangeInput}
          />
        </Row>
      )}
    </Container>
  );
};
