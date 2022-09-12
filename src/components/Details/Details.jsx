import React, { PureComponent } from "react";
import { Query } from "@apollo/client/react/components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { GET_PRODUCTS_BY_ID } from "../../server/queries";
import { addProductToCart } from "../../Redux/shop/actions";
import s from "./Details.module.scss";

export class Details extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mainPic: "",
      attributes: [],
      warningMessage: "",
      success: "",
    };
  }

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

  setMainPic = (photo) => {
    // alert("accepted image");
    this.setState({ mainPic: photo });
  };

  handleOnChange = ({ target }) => {
    const { attributes } = this.state;
    const nextState = attributes.map((a) => {
      if (a.name !== target.name) return a;

      return {
        ...a,
        items: a.items.map((item) => {
          const checked = item.value === target.value;

          return {
            ...item,
            selected: checked,
          };
        }),
      };
    });

    this.setState({
      attributes: nextState,
      warningMessage: "",
    });
  };

  addProductToCart = (product) => {
    const isSelected = this.state.attributes.map((a) =>
      a.items.find((i) => i.selected === true)
    );
    //testintg whether all elements in the isSellected array is not undefined
    if (isSelected.every((item) => item !== undefined)) {
      const newId = `${product.id} ${isSelected.map((i) => i.id).join(" ")}`;
      const updatedProduct = {
        ...product,
        attributes: this.state.attributes,
        qty: 1,
        id: newId,
      };

      this.props.addProductToCart(updatedProduct);
      this.setState({ warningMessage: "" });
      this.setState({ success: "yes" });
    } else {
      this.setState({ warningMessage: "Choose attribute first!" });
      this.setState({ success: "" });
    }
  };

  render() {
    return (
      <Query
        query={GET_PRODUCTS_BY_ID}
        variables={{ id: window.location.pathname.slice(9) }}
        onCompleted={(data) =>
          this.setState({ attributes: data.product.attributes })
        }
        fetchPolicy="network-only"
      >
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return console.log(error);
          if (data.product === undefined) return null;

          const product = data.product;
          const price = this.getPriceByCurrency(product.prices);
          const description = product.description;

          return (
            <div className={s.detailed}>
              <div className={s.images}>
                <div className={s.smallImg}>
                  {product.gallery.map((item, index) => (
                    <img
                      key={index}
                      className={s.imgSmall}
                      onClick={() => this.setMainPic(item)}
                      src={item}
                    />
                  ))}
                </div>
                <img
                  src={
                    this.state.mainPic ? this.state.mainPic : product.gallery[0]
                  }
                  className={s.largeImg}
                />
              </div>

              <div className={s.cartDetails}>
                <h2 className={s.productName}>{product.name}</h2>
                <p className={s.productBrand}>{product.Brand}</p>
                <br />
                <div className={s.atbAll}>
                  {product.attributes.map((a) => (
                    <div className={s.atb} key={`${product.id} ${a.id}`}>
                      <p className={s.atbTitle}>{`${a.name}:`}</p>
                      <div className={s.atbList}>
                        {a.item.map((item, i) => (
                          <div key={`${product.id} ${item.id}`}>
                            <input
                              type="radio"
                              id={`${a.id} ${item.id}`}
                              name={a.name}
                              value={item.value}
                              disabled={product.inStock ? false : true}
                              checked={item.selected}
                              onChange={this.handleOnChange}
                            />
                            <label htmlFor={`${a.id} ${item.id}`}>
                              <div
                                className={
                                  a.type === "swatch" ? "atbText" : "atbColor"
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
                <div className={s.price}>
                  <div className={s.label}>PRICE:</div>
                  <div className={s.tag}>
                    <div className={s.symbol}>{price.currency.symbol}</div>
                    <div className={s.amount}>{price.amount}</div>
                  </div>
                </div>
                <div className={s.btnBlock}>
                  <div
                    onClick={() => {
                      this.addProductToCart(product);
                    }}
                    className={s.addToCart}
                  >
                    ADD TO CART
                  </div>
                  {this.state.success !== "yes" ? (
                    <p className={s.warning}>{this.state.warningMessage}</p>
                  ) : (
                    <p className={s.success}>
                      Item has been added to cart!{" "}
                      <Link to="/"> continue shopping</Link>
                    </p>
                  )}
                </div>
                <div
                  className={s.description}
                  dangerouslySetInnerHTML={{ __html: product.description }}
                ></div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addProductToCart: (product) => dispatch(addProductToCart(product)),
});

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(Details);
