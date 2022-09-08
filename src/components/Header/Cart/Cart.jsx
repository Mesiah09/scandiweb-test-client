import React, { PureComponent } from "react";
import { createRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeProductFromCart,
  addProductToCart,
  checkout,
} from "../../../Redux/shop/actions";
import s from "./Cart.module.scss";

export class CartToggle extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      symbol: "",
    };
  }

  componentDidMount() {
    this.setState({ symbol: localStorage.getItem("symbol") });
  }

  box = createRef();

  removeFromCart = (product) => {
    this.props.removeProductFromCart(product);
  };

  addToCart = (product) => {
    this.props.addProductToCart(product);
  };

  getTotalPrice = () => {
    const totalPrice = this.props.cart.reduce((acc, item) => {
      if (item.prices && localStorage.getItem("symbol")) {
        let price = item.prices.find(
          (p) => p.currency.symbol === localStorage.getItem("symbol")
        );
        return acc + price.amount * item.qty;
      } else {
        let price = item.prices.find((p) => p.currency.symbol === "$");
      }
    }, 0);
    return Math.round(totalPrice * 100) / 100;
  };

  getPriceByCurrency = (prices) => {
    if (prices && localStorage.getItem("symbol")) {
      let price = prices.find(
        (p) => p.currency.symbol === localStorage.getItem("symbol")
      );
      return price;
    }
  };

  render() {
    const { cart } = this.props;
    return (
      <div className={s.cart} ref={this.box}>
        {cart.map((item, index) => (
          <div key={index}>
            <div className={s.minicartItem}>
              <div className={s.minicartItemInfo}>
                <p className={s.brand}>{item.brand}</p>
                <p className={s.name}>{item.name}</p>
                <div className={s.priceValue}>
                  <div className={s.prices}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default CartToggle;
