import React, { PureComponent } from "react";
import Icon from "../../../shared/components/Icon";
import s from "./Slider.module.scss";

export class Slider extends PureComponent {
  state = {
    current: 0,
  };

  nextSlide = () => {
    const { current } = this.state;
    const newCurrent =
      current === this.props.gallery.length - 1 ? 0 : current + 1;
    this.setState({ current: newCurrent });
  };

  prevSlide = () => {
    const { current } = this.state;
    const newCurrent =
      current === 0 ? this.props.gallery.length - 1 : current - 1;
    this.setState({ current: newCurrent });
  };

  render() {
    return (
      <div className={s.slider}>
        {this.props.gallery.length > 1 ? (
          <div className={s.arrows}>
            <div className={s.arrowLeft} onClick={this.prevSlide}>
              <Icon name="icon-slider" />
            </div>
            <div className={s.arrowRight} onClick={this.nextSlide}>
              <Icon name="icon-slider" />
            </div>
          </div>
        ) : null}
        {this.props.gallery.map((slide, index) => {
          return (
            <div key={index}>
              {index === this.state.current && (
                <img className={s.slideImg} src={slide} alt="" />
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Slider;
