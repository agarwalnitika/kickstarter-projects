import React from "react";
import "../common-styles/Header.css";

function Header(headerElements) {
  return <div>{headerElements.map((element) => element.elem)}</div>;
}

export default Header;
