import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { CustomButton } from "../CustomButtons/CustomButton";
import { NewInputText } from "./NewInputText";

export const CourseLevelItem = ({
  level,
  levelIndex,
  onChange,
  templateLevel,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [levelData, setLevelData] = useState(level);

  const handleChangeInput = (event) => {
    const { name, value } = event.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      const updatedLevel = {
        ...levelData,
        [parent]: {
          ...levelData[parent],
          [child]: value,
        },
      };
      setLevelData(updatedLevel);
      onChange({
        target: {
          name: `levels[${levelIndex}]`,
          value: updatedLevel,
        },
      });
    } else {
      const updatedLevel = {
        ...levelData,
        [name]: value,
      };
      setLevelData(updatedLevel);
      onChange({
        target: {
          name: `levels[${levelIndex}]`,
          value: updatedLevel,
        },
      });
    }
  };

  const handleDeleteLevel = () => {
    onChange({
      target: {
        name: "levels",
        value: "DELETE_LEVEL",
        levelIndex,
      },
    });
  };

  return (
    <>
      <Col className="col-12 p-4 grey-bg d-flex justify-content-between align-items-center">
        <div className="d-flex gap-3 flex-column">
          <p className="md bold secondary">{level.title || "Nuovo Livello"}</p>
        </div>
        <div className="d-flex gap-3">
          {isEditing && (
            <CustomButton
              size="sm"
              style="filled-gradient"
              onClick={() => {
                onChange({
                  target: {
                    name: `levels[${levelIndex}]`,
                    value: levelData,
                  },
                });
                setIsEditing(false);
              }}
            >
              Save
            </CustomButton>
          )}
          <CustomButton
            size="sm"
            style="filled-black"
            onClick={() => {
              if (isEditing) {
                setLevelData(level);
              }
              setIsEditing(!isEditing);
            }}
          >
            {isEditing ? "Cancel" : "Edit"}
          </CustomButton>
          <CustomButton
            size="sm"
            style="filled-black"
            onClick={handleDeleteLevel}
          >
            Delete
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
              placeholder={templateLevel?.title}
            />
            <NewInputText
              label="Level Description"
              name="description"
              value={levelData.description}
              onChange={handleChangeInput}
              rows={3}
              col={12}
              description="Recommended 200 characters"
              placeholder={templateLevel?.description}
            />
            <NewInputText
              label="Program List Title"
              name="programListTitle"
              value={levelData.programListTitle}
              onChange={handleChangeInput}
              rows={1}
              col={12}
              description="Recommended 200 characters"
              placeholder={templateLevel?.programListTitle}
            />

            {/* PROGRAM LISTS */}
            <NewInputText
              label="Program First List"
              name="programFirstListItems"
              value={levelData.programFirstListItems.join("\n")}
              onChange={(e) =>
                handleChangeInput({
                  target: {
                    name: "programFirstListItems",
                    value: e.target.value.split("\n"),
                  },
                })
              }
              rows={6}
              col={4}
              description="One item per line"
              placeholder={templateLevel?.programFirstListItems.join("\n")}
            />
            <NewInputText
              label="Program Second List"
              name="programSecondListItems"
              value={levelData.programSecondListItems.join("\n")}
              onChange={(e) =>
                handleChangeInput({
                  target: {
                    name: "programSecondListItems",
                    value: e.target.value.split("\n"),
                  },
                })
              }
              rows={6}
              col={4}
              description="One item per line"
              placeholder={templateLevel?.programSecondListItems.join("\n")}
            />
            <NewInputText
              label="Program Third List"
              name="programThirdListItems"
              value={levelData.programThirdListItems.join("\n")}
              onChange={(e) =>
                handleChangeInput({
                  target: {
                    name: "programThirdListItems",
                    value: e.target.value.split("\n"),
                  },
                })
              }
              rows={6}
              col={4}
              description="One item per line"
              placeholder={templateLevel?.programThirdListItems.join("\n")}
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
              placeholder={templateLevel?.GROUP.duration}
            />
            <NewInputText
              label="Single Duration"
              name="SINGLE.duration"
              value={levelData.SINGLE.duration}
              onChange={handleChangeInput}
              rows={1}
              col={4}
              description="Recommended 200 characters"
              placeholder={templateLevel?.SINGLE.duration}
            />
            <NewInputText
              label="Friends Duration"
              name="FRIENDS.duration"
              value={levelData.FRIENDS.duration}
              onChange={handleChangeInput}
              rows={1}
              col={4}
              description="Recommended 200 characters"
              placeholder={templateLevel?.FRIENDS.duration}
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
              placeholder={templateLevel?.GROUP.description}
            />
            <NewInputText
              label="Single Description"
              name="SINGLE.description"
              value={levelData.SINGLE.description}
              onChange={handleChangeInput}
              rows={4}
              col={4}
              description="Recommended 200 characters"
              placeholder={templateLevel?.SINGLE.description}
            />
            <NewInputText
              label="Friends Description"
              name="FRIENDS.description"
              value={levelData.FRIENDS.description}
              onChange={handleChangeInput}
              rows={4}
              col={4}
              description="Recommended 200 characters"
              placeholder={templateLevel?.FRIENDS.description}
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
              placeholder={templateLevel?.GROUP.price}
            />
            <NewInputText
              label="Single Price"
              name="SINGLE.price"
              value={levelData.SINGLE.price}
              onChange={handleChangeInput}
              rows={1}
              col={4}
              description="Recommended 200 characters"
              placeholder={templateLevel?.SINGLE.price}
            />
            <NewInputText
              label="Friends Price"
              name="FRIENDS.price"
              value={levelData.FRIENDS.price}
              onChange={handleChangeInput}
              rows={1}
              col={4}
              description="Recommended 200 characters"
              placeholder={templateLevel?.FRIENDS.price}
            />
          </Row>
        </Container>
      )}
    </>
  );
};
