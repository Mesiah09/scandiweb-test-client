import React, { PureComponent } from "react";
import CartDetails from "../../components/CartDetails";
import Header from "../../components/Header";

import s from "./CartPage.module.scss";

export class CartPage extends PureComponent {
  render() {
    return (
      <>
        <Header />
        <CartDetails />
      </>
    );
  }
}

export default CartPage;
