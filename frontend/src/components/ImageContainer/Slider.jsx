import React from "react";

export const Slider = ({ height, image }) => {
  return (
    <div>
      <img src={image} height={height} className="w-100" />
    </div>
  );
};
