import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  addProductToCart,
  removeProductFromCart,
  checkout,
} from "../../Redux/shop/actions";
import Prices from "../Header/Cart/Prices";
import Attributes from "./Attributes";
import Slider from "./Slider";
import s from "./CartDetails.module.scss";

class CartDetails extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      symbol: "",
    };
  }
  removeProductFromCart = (product) => {
    this.props.removeProductFromCart(product);
  };

  addProductToCart = (product) => {
    this.props.addProductToCart(product);
  };

  getPriceByCurrency = (prices) => {
    if (prices && localStorage.getItem("symbol")) {
      let price = prices.find(
        (p) => p.currency.symbol === localStorage.getItem("symbol")
      );

      return price;
    } else {
      let price = prices.find((p) => p.currency.symbol === "$");

      return price;
    }
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
        return acc + price.amount * item.qty;
      }
    }, 0);
    return Math.round(totalPrice * 100) / 100;
  };

  getTax = () => {
    const tax = (this.getTotalPrice() / 100) * 12;
    return Math.round(tax * 10) / 10;
  };

  componentDidMount() {
    this.setState({ symbol: localStorage.getItem("symbol") });
  }

  render() {
    const cartItems = this.props.cart;

    return (
      <div className={s.cart}>
        <h1 className={s.title}>Cart</h1>
        <div className={s.border}>
          <hr width="auto" color="#E5E5E5" size="1" />
        </div>
        {cartItems.length === 0 ? (
          <p className={s.empty}>Cart is empty</p>
        ) : (
          <div>
            {cartItems.map((item, index) => {
              return (
                <div key={item.id}>
                  <div className={s.item}>
                    <div className={s.details}>
                      <Link
                        to={`/details/${item.id.split(" ")[0]}`}
                        style={{ color: "black", textDecorationLine: "none" }}
                      >
                        <h2 className={s.productName}>{item.name}</h2>
                        <p className={s.productBrand}>{item.brand}</p>
                      </Link>
                      <div className={s.price}>
                        <Prices
                          getPrice={() => this.getPriceByCurrency(item.prices)}
                          symbol={this.state.symbol}
                        />
                      </div>
                      <Attributes {...item} index={index} />
                    </div>
                    <div className={s.images}>
                      <div className={s.activity}>
                        <div
                          onClick={() => {
                            this.addProductToCart(item);
                          }}
                          className={s.plus}
                        >
                          +
                        </div>
                        <div className={s.qty}>
                          <span>{item.qty}</span>
                        </div>
                        <div
                          className={s.minus}
                          onClick={() => {
                            this.removeProductFromCart(item);
                          }}
                        >
                          -
                        </div>
                      </div>
                      <div className={s.slider}>
                        <Slider gallery={item.gallery} />
                      </div>
                    </div>
                  </div>
                  <hr width="auto" color="#E5E5E5" size="1" />
                </div>
              );
            })}
            <div className={s.result}>
              <div className={s.tax}>
                <div>Tax 21%</div>
                <div>
                  <p>
                    {localStorage.getItem("symbol")
                      ? localStorage.getItem("symbol")
                      : "$"}
                    {this.getTax()}
                  </p>
                </div>
              </div>
              <div className={s.qty}>
                <div>Qty:</div>
                <p>{this.props.totalQty}</p>
              </div>
              <div className={s.total}>
                <div>
                  <p>
                    {localStorage.getItem("symbol")
                      ? localStorage.getItem("symbol")
                      : "$"}
                    {this.getTotalPrice()}
                  </p>
                </div>
              </div>
            </div>
            <div onClick={() => this.props.checkout()} className={s.checkout}>
              ORDER
            </div>
          </div>
        )}
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
  checkout: () => dispatch(checkout()),
});

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(CartDetails);
