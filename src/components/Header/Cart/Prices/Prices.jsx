import React, { PureComponent } from "react";
import s from "./Prices.module.scss";

export class Prices extends PureComponent {
  render() {
    const { getPrice, symbol } = this.props;

    let price = getPrice();
    return (
      <div className={s.price}>
        <p className={s.symbol}>{symbol}</p>
        <p className={s.amount}>{price.amount}</p>
      </div>
    );
  }
}

export default Prices;
