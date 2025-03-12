import React from "react";
import "../styles/paginationButton.css";

const PaginationButton = ({ onClick, disabled, direction, children }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`pagination-btn ${direction}`}
    >
      {children}
    </button>
  );
};

export default PaginationButton;
