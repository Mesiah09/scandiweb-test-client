import React from "react";

import NavBtn from "./NavBtn";
import Logo from "./Logo/Logo";
import Currencies from "./Currencies";
import Cart from "./Cart";
import s from "./Header.module.scss";

const Header = () => {
  return (
    <div className={s.header}>
      <ul className={s.nav}>
        <li className={s.category}>
          <NavBtn name="WOMEN" />
        </li>
        <li className={s.category}>
          <NavBtn name="MEN" />
        </li>
        <li className={s.category}>
          <NavBtn name="KIDS" />
        </li>
      </ul>
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
