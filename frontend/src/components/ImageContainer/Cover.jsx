import React from "react";

export const Cover = ({ height, image }) => {
  return (
    <div>
      <img src={image} height={height} className="w-100 object-fit-cover" />
    </div>
  );
};
