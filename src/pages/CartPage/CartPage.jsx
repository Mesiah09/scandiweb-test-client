import React, { PureComponent } from "react";
import Header from "../../components/Header";
import Cart from "../../components/Header/Cart";

import s from "./CartPage.module.scss";

export class CartPage extends PureComponent {
  render() {
    return (
      <>
        <Header />
        <Cart />
      </>
    );
  }
}

export default CartPage;
