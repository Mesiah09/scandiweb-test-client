import React, { PureComponent } from "react";
import { connect } from "react-redux";

import Icon from "../../shared/components/Icon";
import trolley from "../../images/trolley.png";
import Logo from "./Logo/Logo";
import Currencies from "./Currencies";
import Cart from "./Cart";
import Categories from "./Categories";
import s from "./Header.module.scss";
import "./Header.module.scss";

export class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      toggleCurr: false,
      toggleCart: false,
      symbol: "$",
      isOpen: false,
    };
  }

  refreshPage = () => {
    window.location.reload(false);
  };

  optionClickHandler = (symbol) => {
    this.setState({ symbol, isOpen: false });
    localStorage.setItem("symbol", symbol);
  };
  render() {
    const { totalQty, cart } = this.props;
    return (
      <div className={s.header}>
        <div className={s.headerItems} onClick={this.refreshPage}>
          <Categories length={cart.length} qty={totalQty} />
        </div>

        <div onClick={() => {}}>
          <Logo />
        </div>

        <div className={s.trailItems}>
          <div className={[s.headerItem] + " " + [s.dropdown]}>
            <div
              className={s.link}
              onClick={() => {
                if (this.state.toggleCart === true) {
                  this.setState({ toggleCart: !this.state.toggleCart });
                }
                this.setState({ toggleCurr: !this.state.toggleCurr });
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ paddingRight: 5 }}>
                  {localStorage.getItem("symbol")}
                </p>
                <Icon name="icon-down" width="6" height="3" />
              </div>
            </div>
            <div
              className={`${s.dropdownMenu} ${
                this.state.toggleCurr && [s.activeMenu]
              }`}
            >
              <Currencies value={this.optionClickHandler} />
            </div>
          </div>

          <div className={`${s.headerItem} ${s.dropdown}`}>
            <div
              className={s.link}
              onClick={() => {
                if (this.state.toggleCurr === true) {
                  this.setState({ toggleCurr: !this.state.toggleCurr });
                }
                this.setState({ toggleCart: !this.state.toggleCart });
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginRight: 5,
                }}
              >
                <div
                  style={{
                    paddingRight: 5,
                  }}
                >
                  <img
                    src={trolley}
                    alt=""
                    height={23}
                    style={{ objectFit: "contain" }}
                  />
                  {cart.length !== 0 && (
                    <>
                      <div className={s.qtyIcon}>{totalQty}</div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div
              className={`${s.dropdown} ${
                this.state.toggleCart && s.activeMenu
              }`}
            ></div>
            {this.state.toggleCart ? <Cart /> : ""}
          </div>
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

const functionFromConnect = connect(mapStateToProps, null);

export default functionFromConnect(Header);
