import React from "react";

import Logo from "./Logo/Logo";
import Currencies from "./Currencies";
import Cart from "./Cart";
import Categories from "./Categories";
import s from "./Header.module.scss";

const Header = () => {
  return (
    <div className={s.header}>
      <div className={s.categoriesWrapper}>
        <Categories />
      </div>
      <Logo />
      <div className={s.trail}>
        <div className={s.curWrapper}>
          <Currencies />
        </div>
        <Cart />
      </div>
    </div>
  );
};

export default Header;
