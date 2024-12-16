import React from "react";
import { CustomButton } from "../CustomButtons/CustomButton";

const defaultLevel = {
  title: "",
  description: "",
  programListTitle: "",
  programFirstListItems: [],
  programSecondListItems: [],
  programThirdListItems: [],
  GROUP: {
    price: 0,
    duration: "",
    description: "",
  },
  SINGLE: {
    price: 0,
    duration: "",
    description: "",
  },
  FRIENDS: {
    price: 0,
    duration: "",
    description: "",
  },
};

export const AddLevelButton = ({ currentLevels, onChange }) => {
  const handleAddLevel = () => {
    onChange({
      target: {
        name: "levels",
        value: [...currentLevels, defaultLevel],
      },
    });
  };

  return (
    <CustomButton size="sm" style="filled-gradient" onClick={handleAddLevel}>
      Aggiungi Livello
    </CustomButton>
  );
};
