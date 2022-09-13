import React, { PureComponent } from "react";

import s from "./Attributes.module.scss";

export class Attributes extends PureComponent {
  render() {
    const { index, id, attributes } = this.props;

    return (
      <div>
        {attributes.map((a) => (
          <div className={s.attributes} key={`${id} ${a.name}`}>
            <p className={s.cartItem}>{`${a.name}:`}</p>
            <div className={s.list}>
              {a.items.map((item) => (
                <div key={`${id} ${item.id}`}>
                  <input
                    type="radio"
                    id={`${a.id} ${item.id}`}
                    name={a.name + index}
                    value={item.value}
                    defaultChecked={item.selected}
                  />
                  <label htmlFor={`${a.id} ${item.id}`}>
                    <div
                      className={
                        a.type !== "swatch"
                          ? "attributes__text cart-item__attributes-text_" +
                            item.selected
                          : "attributes__color cart-item__attributes-color_" +
                            item.selected
                      }
                      style={
                        a.type === "swatch"
                          ? {
                              background: item.value,
                              border: `1px solid ${
                                item.id === "White" ? "black" : item.value
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
    );
  }
}

export default Attributes;
