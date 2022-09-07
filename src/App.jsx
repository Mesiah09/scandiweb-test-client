import React, { PureComponent } from "react";

import MyRoutes from "./Routes";
import "./App.scss";

class App extends PureComponent {
  render() {
    return (
      <div>
        <MyRoutes />
      </div>
    );
  }
}

export default App;
