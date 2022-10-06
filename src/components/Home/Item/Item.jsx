import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Query } from "@apollo/client/react/components";
import { Link } from "react-router-dom";

import Icon from "../../../shared/components/Icon";
import Prices from "../../Header/Cart/Prices";
import { GET_PRODUCTS_BY_CATEGORY } from "../../../server/queries";
import { addProductToCart } from "../../../Redux/shop/actions";
import s from "./Item.module.scss";

class Item extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      symbol: "",
    };
  }

  addToCart = (product) => {
    let updatedProduct = {};
    if (product.attributes.length === 0) {
      updatedProduct = {
        ...product,
        qty: 1,
        id: `${product.id} `,
      };
      this.props.addProductToCart(updatedProduct);
    } else {
      const updatedAttributes = product.attributes.map((a) => {
        return {
          ...a,
          items: a.items.map((item, index) => {
            return index === 0
              ? { ...item, selected: true }
              : { ...item, selected: false };
          }),
        };
      });
      const selectedAttribute = updatedAttributes.map((a) =>
        a.items.find((i) => i.selected === true)
      );
      updatedProduct = {
        ...product,
        attributes: updatedAttributes,
        qty: 1,
        id: `${product.id} ${selectedAttribute.map((i) => i.id).join(" ")}`,
      };
      this.props.addProductToCart(updatedProduct);
      window.location.replace("/cart");
    }
  };

  componentDidMount() {
    this.setState({ symbol: localStorage.getItem("symbol") });
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

  render() {
    return (
      <Query
        key={"yes"}
        query={GET_PRODUCTS_BY_CATEGORY}
        variables={{ input: { title: window.location.pathname.slice(1) } }}
        fetchPolicy="network-only"
      >
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return console.log(error);
          if (data.category === undefined) return null;

          const products = data.category.products;

          return products.map((item, index) => (
            <Link
              key={index}
              className={[s.itemCard] + " " + [!item.inStock && [s.disable]]}
              to={`/details/${item.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                className={[s.itemWrap] + " " + [!item.inStock && [s.stockImg]]}
              >
                <div className={s.imgWrap}>
                  <img
                    className={s.itemImg}
                    src={item.gallery[0]}
                    style={{
                      borderRadius: "8px",
                      maxWidth: "100%",
                      aspectRatio: "1 / 1",
                    }}
                  />
                  {!item.inStock && <div className={s.stock}>OUT OF STOCK</div>}
                </div>
                <div className={s.cart}>
                  <Icon
                    name="icon-cart"
                    height="52"
                    width="52"
                    onClick={() => this.addToCart(item)}
                  />
                </div>
                <div className={s.details}>
                  <p className={s.itemName}>{item.name}</p>
                  <div className={s.price}>
                    <Prices
                      getPrice={() => this.getPriceByCurrency(item.prices)}
                      symbol={this.state.symbol}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ));
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
export default functionFromConnect(Item);
