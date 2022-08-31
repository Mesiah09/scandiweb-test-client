import React from "react";
import s from "./NavBtn.module.scss";

const NavBtn = ({ name, onClick }) => {
  return (
    <button className={s.navBtn} onClick={onClick}>
      {name}
    </button>
  );
};

export default NavBtn;
