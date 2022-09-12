import React, { PureComponent } from "react";
import { Connect } from "react-redux";

import Icon from "../../shared/components/Icon";
import trolley from "../../images/trolley.png";
import Logo from "./Logo/Logo";
import Currencies from "./Currencies";
import CartToggle from "./Cart";
import Categories from "./Categories";
import s from "./Header.module.scss";

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
        <div className={s.categoriesWrapper} onClick={this.refreshPage}>
          <Categories qty={totalQty} />
        </div>
        <Logo />
        <div className={s.trail}>
          <div className={s.curWrapper}>
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
                <p>{localStorage.getItem("symbol")}</p>
                <Icon name="icon-down" width="6" height="3" />
              </div>
            </div>
            <div
              className={`dropdownMenu ${
                this.state.toggleCurr && "active-menu"
              }`}
            >
              <Currencies value={this.optionClickHandler} />
            </div>
          </div>
          <div className={s.cartWrapper}>
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
                <div>
                  <img
                    src={trolley}
                    alt=""
                    height={23}
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </div>
            </div>
            <div
              className={`dropdown ${this.state.toggleCart && "active-menu"}`}
            ></div>
            {this.state.toggleCart ? <CartToggle /> : ""}
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
