import react, { PureComponent } from "react";
import Item from "./Item";
import s from "./Home.module.scss";

export class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: "",
    };
  }

  componentDidMount() {
    this.setState({ ctegoryName: window.location.pathname.slice(1) });
  }

  render() {
    return (
      <div className={s.layout}>
        <h2 className={s.title}>
          {this.state.categoryName ? this.state.categoryName : this.props.title}
        </h2>

        <div className={s.products}>
          <Item />
        </div>
      </div>
    );
  }
}

export default Home;
