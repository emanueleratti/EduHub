import React from "react";

export const Slider = ({ desktopHeight, mobileHeight, image }) => {
  return (
    <div className="position-relative overflow-hidden w-100">
      <div className="d-none d-lg-block" style={{ height: desktopHeight }}>
        <img
          src={image}
          alt=""
          className="w-100 h-100 object-fit-cover d-block"
        />
      </div>

      <div className="d-block d-lg-none" style={{ height: mobileHeight }}>
        <img
          src={image}
          alt=""
          className="w-100 h-100 object-fit-cover d-block"
        />
      </div>
    </div>
  );
};
