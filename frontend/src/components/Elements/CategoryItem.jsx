import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { CustomButton } from "../CustomButtons/CustomButton";
import { NewInputText } from "../Elements/NewInputText";
import { NewInputImg } from "../Elements/NewInputImg";

export const CategoryItem = ({ category, handleDelete, handleUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updateCategory, setUpdateCategory] = useState(category);

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setUpdateCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
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
            onChange={handleChangeInput}
            description="Recommended size: 1920x700px"
            preview={updateCategory.gallerySlider}
          />
        </Row>
      )}
    </Container>
  );
};
