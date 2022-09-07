import React, { PureComponent } from "react";
import { CATEGORY_NAMES } from "../../../server/queries";
import { Query } from "@apollo/client/react/components";
import s from "./Categories.module.scss";
import { Link } from "react-router-dom";

class Categories extends PureComponent {
  handleClick = () => {};
  render() {
    return (
      <Query key={"key"} query={CATEGORY_NAMES}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return console.log(error);
          if (data.categories === undefined) return null;

          return data.categories.map((item, index) => (
            <Link
              to={`/${item.name}`}
              key={index}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className={s.categoryItem}>{item.name}</div>
            </Link>
          ));
        }}
      </Query>
    );
  }
}

export default Categories;
