import React, { PureComponent } from "react";
import Details from "../../components/Details/Details";
import Header from "../../components/Header";

export class ProductDetails extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Header />
        <Details />
      </>
    );
  }
}

export default ProductDetails;
