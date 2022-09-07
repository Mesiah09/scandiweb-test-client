import { Query } from "@apollo/client/react/components";
import React, { PureComponent } from "react";
import { CURRENCY_DETAILS } from "../../../server/queries";
import s from "./Currencies.module.scss";

export class Currencies extends PureComponent {
  render() {
    return (
      <Query query={CURRENCY_DETAILS}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return console.log(error);
          if (data.currencies === undefined) return null;

          return data.currencies.map((item, index) => (
            <div
              className={s.currencies}
              key={index}
              onClick={() => {
                this.props.value(item.symbol);
                window.location.reload(false);
              }}
            >
              <div className={s.symbol}>{item.symbol}</div>
              <div className={s.label}>{item.label}</div>
            </div>
          ));
        }}
      </Query>
    );
  }
}

export default Currencies;
