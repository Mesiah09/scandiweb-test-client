import React from "react";
import Icons from "../../../images/icons.svg";

const Icon = ({ name, width, height, className, onClick }) => {
  return (
    <svg width={width} height={height} className={className} onClick={onClick}>
      <use href={Icons + `#${name}`}></use>
    </svg>
  );
};

export default Icon;
