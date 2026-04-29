import ContentWrapper from "./ContentWrapper";
import Header from "./Header";
import Sidebar from "./Sidebar";
import React from "react";
import "../common-styles/LandingWrapper.css";

function ButtonComponent(onClickHandler) {
  const [loading, setLoading] = useState();
  return <div className="main-layout" onClick={clickHandler}></div>;
}

export default ButtonComponent;
