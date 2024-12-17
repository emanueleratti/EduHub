import "./CustomButton.css";
import React from "react";
import { Button } from "react-bootstrap";

export const CustomButton = ({
  weight,
  size,
  style,
  children,
  onClick,
  disabled,
  type = "button",
  href,
}) => {
  const buttonClass = `
    btn 
    ${weight ? `${weight}` : ""}
    ${size ? `button-${size}` : ""} 
    ${style ? `${style}` : ""}
  `.trim();

  return (
    <Button
      className={buttonClass}
      onClick={onClick}
      type={type}
      disabled={disabled}
      href={href}
    >
      {children}
    </Button>
  );
};
