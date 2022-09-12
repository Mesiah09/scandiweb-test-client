import React from "react";
import { PureComponent } from "react";
import Header from "../../components/Header";
import Home from "../../components/Home";
import s from "./ProductListPage.module.scss";

export class ProductListPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      title: "all",
    };
  }

  render() {
    return (
      <>
        <Header />
        <div>
          <Home title={this.state.title} />
        </div>
      </>
    );
  }
}

export default ProductListPage;
