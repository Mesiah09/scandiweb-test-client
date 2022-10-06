import { SpinnerCircular } from "spinners-react";
import React from "react";

import s from "./Loader.module.scss";

const Loader = ({ isEnabled }) => {
  return (
    <div className={s.loader}>
      <SpinnerCircular
        enabled={isEnabled}
        size={90}
        thickness={110}
        speed={150}
        color="#5ECE7B"
        secondaryColor="#1D1F22"
      />
    </div>
  );
};

export default Loader;
