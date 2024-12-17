import axios from "axios";
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { CustomButton } from "../CustomButtons/CustomButton";
import { NewInputText } from "../Elements/NewInputText";
import { NewInputImg } from "../Elements/NewInputImg";
import { isLoadingAtom } from "../../stateManager/atom";
import { useAtom } from "jotai";
import { categoriesPageActionsAtom } from "../../stateManager/atom";

export const CategoryItem = ({ category, handleDelete, handleUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updateCategory, setUpdateCategory] = useState(category);
  const [, categoriesCRUD] = useAtom(categoriesPageActionsAtom);
  const [loading] = useAtom(isLoadingAtom);

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setUpdateCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  const handleSubmit = async () => {
    try {
      await handleUpdate(category._id, updateCategory);
      setIsEditing(false);
    } catch (error) {
      console.error("Submit update error:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
    setUpdateCategory(category);
  };

  return (
    <Container fluid>
      <Row className="d-flex flex-column gap-5">
        <Col className="py-3 px-4 lg-grey-bg d-flex justify-content-between align-items-center">
          <div className="d-flex gap-3 flex-column">
            <p className="sm bold secondary">CATEGORY</p>
            <p className="mid bold primary">{category.title.toUpperCase()}</p>
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
              onClick={() => handleDelete(category._id)}
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
            value={updateCategory.slug}
            onChange={handleChangeInput}
            rows={1}
            description="Recommended 200 characters"
          />
          <NewInputText
            label="Title"
            name="title"
            value={updateCategory.title}
            onChange={handleChangeInput}
            rows={1}
            description="Recommended 200 characters"
          />
          <NewInputText
            label="Title Extended"
            name="titleExtended"
            value={updateCategory.titleExtended}
            onChange={handleChangeInput}
            rows={1}
            description="Recommended 200 characters"
          />
          <NewInputText
            label="Subtitle"
            name="subtitle"
            value={updateCategory.subtitle}
            onChange={handleChangeInput}
            rows={1}
            description="Recommended 200 characters"
          />
          <NewInputText
            label="Description"
            name="description"
            value={updateCategory.description}
            onChange={handleChangeInput}
            rows={6}
            description="Recommended 200 characters"
          />
          <NewInputImg
            label="Gallery Slider"
            name="gallerySlider"
            onChange={handleChangeFile}
            description="Recommended size: 1920x700px"
            preview={updateCategory.gallerySlider}
            disabled={loading}
          />
        </Row>
      )}
    </Container>
  );
};
