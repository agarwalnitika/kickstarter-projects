import React from "react";
import PaginationButton from "./PaginationButton";
import { MAX_RECORDS_PER_PAGE } from "../constants/commonConstants";

const PaginationComponent = ({
  serialNumber,
  totalRecords,
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  return (
    <div className="pagination">
      <div style={{ display: "flex" }}>
        <span>Rows per page: {MAX_RECORDS_PER_PAGE}</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "120px",
        }}
      >
        <PaginationButton
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          direction="prev"
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              color: "#17181C",
              fontWeight: 500,
            }}
          >
            {currentPage}
          </span>
          /{totalPages}
        </div>
        <PaginationButton
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          direction="next"
        />
      </div>
    </div>
  );
};

export default PaginationComponent;
