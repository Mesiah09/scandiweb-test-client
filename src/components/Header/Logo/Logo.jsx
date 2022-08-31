import React from "react";
import { NavLink } from "react-router-dom";

import Icon from "../../../shared/components/Icon";
import s from "./Logo.module.scss";

const Logo = () => {
  return (
    <div>
      <Icon name="icon-logo" width="32" height="30" />
    </div>
  );
};

export default Logo;
