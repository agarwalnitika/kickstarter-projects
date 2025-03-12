import React, { useState } from "react";
import PaginationButton from "./PaginationButton";
import "../styles/style.css";
import { formatCurrency } from "../utils/formatCurrency";
import Tooltip from "./Tooltip";

const Table = ({ projects }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  // Calculate total pages
  const totalPages = Math.ceil(projects.length / recordsPerPage);

  // Get records for current page
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = projects.slice(indexOfFirstRecord, indexOfLastRecord);

  console.log("Projects in Table:", projects);

  return (
    <div className="table-wrapper">
      <div className="table-container">
        <table border={1}>
          <thead>
            <tr>
              <th>
                <Tooltip text="Serial Number">S.No</Tooltip>
              </th>

              <th>
                <Tooltip text="Percentage of funding received">
                  Percentage Funded
                </Tooltip>
              </th>

              <th>
                <Tooltip text="Total amount pledged">Amount Pledged</Tooltip>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((project, index) => (
              <tr key={index}>
                <td>{project["s.no"]}</td>

                <td>{project["percentage.funded"]}%</td>

                <td>
                  {formatCurrency(project["amt.pledged"], project.currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination stays fixed */}
      <div className="pagination">
        <PaginationButton
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </PaginationButton>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <PaginationButton
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </PaginationButton>
      </div>
    </div>
  );
};

export default Table;
