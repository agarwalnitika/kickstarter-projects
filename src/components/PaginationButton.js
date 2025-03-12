import React from "react";

const PaginationButton = ({ onClick, disabled, children }) => {
  return (
    <button onClick={onClick} disabled={disabled} className="pagination-btn">
      {children}
    </button>
  );
};

export default PaginationButton;
