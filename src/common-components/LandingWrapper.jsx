import ContentWrapper from "./ContentWrapper";
import Header from "./Header";
import Sidebar from "./Sidebar";
import React from "react";
import "../common-styles/LandingWrapper.css";

function LandingWrapper() {
  const fetchApiData = () => {
    // [textfieldvalidation1, set...] = false
    // = false

    currentButtonstate =
      textfieldvalidation1 && textfieldvalidation2 ? "enable" : "disabled";

    // loading-disable
  };
  // const headerElements = [
  //   {
  //     buttonType: "icon",
  //     elem: <Filter />,
  //     clickHandler: () => {
  //       // openFilterMenu
  //     },
  //   },
  //   {
  //     buttonType: "icon",
  //     elem: <Button onClickHandler: () => {
  //       fetchApiData
  //     } />,
  //     clickHandler: () => {
  // },
  //   },
  // ];

  // textfield1 validation
  // textfield2 validation
  //
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="content-layout">
        <Header />
        <ContentWrapper />
        {showFilterMenu && <Popover position="relative" />}
      </div>
    </div>
  );
}

export default LandingWrapper;
