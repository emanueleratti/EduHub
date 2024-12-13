import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { CustomButton } from "../CustomButtons/CustomButton";
import { NewInputText } from "./NewInputText";

export const CourseLevelItem = ({ level, handleDelete, handleUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [levelData, setLevelData] = useState({
    title: "",
    description: "",
    programListTitle: "",
    programFirstListItems: [],
    programSecondListItems: [],
    programThirdListItems: [],
    GROUP: { price: "", duration: "", description: "" },
    SINGLE: { price: "", duration: "", description: "" },
    FRIENDS: { price: "", duration: "", description: "" },
  });

  const handleChangeInput = (event) => {
    const { name, value } = event.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setLevelData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setLevelData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCreate = () => {
    if (isEditing) {
      handleUpdate(levelData);
      setLevelData({
        title: "",
        description: "",
        programListTitle: "",
        programFirstListItems: [],
        programSecondListItems: [],
        programThirdListItems: [],
        GROUP: { price: "", duration: "", description: "" },
        SINGLE: { price: "", duration: "", description: "" },
        FRIENDS: { price: "", duration: "", description: "" },
      });
    }
    setIsEditing(!isEditing);
  };

  return (
    <>
      <Col className="p-4 grey-bg d-flex justify-content-between align-items-center">
        <div className="d-flex gap-3 flex-column">
          <p className="md bold secondary">
            {isEditing
              ? levelData.title || "Nuovo Livello"
              : "Aggiungi Livello"}
          </p>
        </div>
        <div className="d-flex gap-3">
          {isEditing && (
            <CustomButton
              size="sm"
              style="filled-gradient"
              onClick={handleCreate}
            >
              Salva
            </CustomButton>
          )}
          <CustomButton
            size="sm"
            style="filled-black"
            onClick={() => {
              if (isEditing) {
                setLevelData({
                  title: "",
                  description: "",
                  programListTitle: "",
                  programFirstListItems: [],
                  programSecondListItems: [],
                  programThirdListItems: [],
                  GROUP: { price: "", duration: "", description: "" },
                  SINGLE: { price: "", duration: "", description: "" },
                  FRIENDS: { price: "", duration: "", description: "" },
                });
              }
              setIsEditing(!isEditing);
            }}
          >
            {isEditing ? "Annulla" : "Aggiungi"}
          </CustomButton>
        </div>
      </Col>

      {isEditing && (
        <Container fluid>
          <Row className="d-flex grey-bg flex-wrap mt-0 pb-4 px-3 gy-4">
            <NewInputText
              label="Level Title"
              name="title"
              value={levelData.title}
              onChange={handleChangeInput}
              rows={1}
              col={12}
              description="Recommended 200 characters"
            />
            <NewInputText
              label="Level Description"
              name="description"
              value={levelData.description}
              onChange={handleChangeInput}
              rows={3}
              col={12}
              description="Recommended 200 characters"
            />
            <NewInputText
              label="Program List Title"
              name="programListTitle"
              value={levelData.programListTitle}
              onChange={handleChangeInput}
              rows={1}
              col={12}
              description="Recommended 200 characters"
            />
            <NewInputText
              label="Program List Items"
              name="programFirstListItems"
              value={levelData.programFirstListItems}
              onChange={handleChangeInput}
              rows={6}
              col={4}
              description="Recommended 200 characters"
            />
            <NewInputText
              label="Program List Items"
              name="programSecondListItems"
              value={levelData.programSecondListItems}
              onChange={handleChangeInput}
              rows={6}
              col={4}
              description="Recommended 200 characters"
            />
            <NewInputText
              label="Program List Items"
              name="programThirdListItems"
              value={levelData.programThirdListItems}
              onChange={handleChangeInput}
              rows={6}
              col={4}
              description="Recommended 200 characters"
            />
            <span className="line-small white-bg"></span>
            <p className="mid bold primary mt-4">
              COURSE LEVEL SPECIFIC INFORMATIONS
            </p>

            {/* DURATIONS */}
            <NewInputText
              label="Group Duration"
              name="GROUP.duration"
              value={levelData.GROUP.duration}
              onChange={handleChangeInput}
              rows={1}
              col={4}
              description="Recommended 200 characters"
            />
            <NewInputText
              label="Single Duration"
              name="SINGLE.duration"
              value={levelData.SINGLE.duration}
              onChange={handleChangeInput}
              rows={1}
              col={4}
              description="Recommended 200 characters"
            />
            <NewInputText
              label="Friends Duration"
              name="FRIENDS.duration"
              value={levelData.FRIENDS.duration}
              onChange={handleChangeInput}
              rows={1}
              col={4}
              description="Recommended 200 characters"
            />

            {/* DESCRIPTIONS */}
            <NewInputText
              label="Group Description"
              name="GROUP.description"
              value={levelData.GROUP.description}
              onChange={handleChangeInput}
              rows={4}
              col={4}
              description="Recommended 200 characters"
            />
            <NewInputText
              label="Single Description"
              name="SINGLE.description"
              value={levelData.SINGLE.description}
              onChange={handleChangeInput}
              rows={4}
              col={4}
              description="Recommended 200 characters"
            />
            <NewInputText
              label="Friends Description"
              name="FRIENDS.description"
              value={levelData.FRIENDS.description}
              onChange={handleChangeInput}
              rows={4}
              col={4}
              description="Recommended 200 characters"
            />

            {/* PRICES */}
            <NewInputText
              label="Group Price"
              name="GROUP.price"
              value={levelData.GROUP.price}
              onChange={handleChangeInput}
              rows={1}
              col={4}
              description="Recommended 200 characters"
            />
            <NewInputText
              label="Single Price"
              name="SINGLE.price"
              value={levelData.SINGLE.price}
              onChange={handleChangeInput}
              rows={1}
              col={4}
              description="Recommended 200 characters"
            />
            <NewInputText
              label="Friends Price"
              name="FRIENDS.price"
              value={levelData.FRIENDS.price}
              onChange={handleChangeInput}
              rows={1}
              col={4}
              description="Recommended 200 characters"
            />
          </Row>
        </Container>
      )}
    </>
  );
};
