import React, { PureComponent } from "react";
import { createRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeProductFromCart,
  addProductToCart,
  checkout,
} from "../../../Redux/shop/actions";
import Prices from "./Prices";
import s from "./Cart.module.scss";

export class Cart extends PureComponent {
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
        {cart?.map((item, index) => (
          <div key={index}>
            <div className={s.minicartItem}>
              <div className={s.minicartItemInfo}>
                <p className={s.brand}>{item.brand}</p>
                <p className={s.name}>{item.name}</p>
                <div className={s.priceValue}>
                  <Prices
                    getPrice={() => this.getPriceByCurrency(item.prices)}
                    symbol={this.state.symbol}
                  />
                </div>
                <div className={s.minicartItemAtb}>
                  {item.attributes.map((a) => (
                    <div className={s.atb} key={`${item.id} ${item.name}`}>
                      <p className={s.atbTitle}>{`${a.name}:`}</p>
                      <div className={s.atbList}>
                        {a.items.map((item) => (
                          <div key={`${item.id} ${item.id}`}>
                            <input
                              type="radio"
                              id={`${a.id} ${item.id}`}
                              name={a.name + index}
                              value={item.value}
                            />
                            <label htmlFor={`${a.id} ${item.id}`}>
                              <div
                                className={
                                  a.type !== "swatch"
                                    ? "atbText_" + item.selected
                                    : "atbColor_" + item.selected
                                }
                                style={
                                  a.type === "swatch"
                                    ? {
                                        background: item.value,
                                        border: `1px solid ${
                                          item.id === "White"
                                            ? "black"
                                            : item.value
                                        }`,
                                      }
                                    : null
                                }
                              >
                                {a.type === "swatch" ? "" : item.value}
                              </div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={s.minicartTrail}>
              <div className={s.minicartItemQty}>
                <div className={s.btnPlus} onClick={() => this.addToCart(item)}>
                  <span>+</span>
                </div>
                <div
                  className={s.btnMinus}
                  onClick={() => this.removeFromCart(item)}
                >
                  <span>-</span>
                </div>
                4
                <div className={s.minicartGallery}>
                  <img src={item.gallery[0]} alt="" />
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className={s.minicartTotal}>
          <p>Total</p>
          <p>
            {localStorage.getItem("symbol")
              ? localStorage.getItem("symbol")
              : "$"}{" "}
            {this.getTotalPrice}
          </p>
        </div>
        <div className={s.minicartBtns}>
          <Link to={"/cart"}>
            {" "}
            <button className={s.btnView} onClick={this.ChangeHandler}>
              View Bag
            </button>
          </Link>
          <button
            className={s.btnCheckout}
            onClick={() => this.props.checkout()}
          >
            Checkout
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
    totalQty: state.shop.totalQty,
  };
};

const mapDispatchToProps = (dispatch) => ({
  removeProductFromCart: (product) => dispatch(removeProductFromCart(product)),
  addProductToCart: (product) => dispatch(addProductToCart(product)),
  setMiniCartIsOpen: () => dispatch(checkout()),
  checkout: () => dispatch(checkout()),
});

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(Cart);
