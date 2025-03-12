import React, { useState } from "react";
import PaginationButton from "./PaginationButton";
import "../styles/style.css";

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
    <div className="table-container">
      <table border={1}>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Percentage Funded</th>
            <th>Amount Pledged</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((project, index) => (
            <tr key={index}>
              <td>{project["s.no"] + 1}</td>
              <td>{project["percentage.funded"]}%</td>
              <td>${Number(project["amt.pledged"] || 0).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <PaginationButton
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </PaginationButton>

        <span>
          {" "}
          Page {currentPage} of {totalPages}{" "}
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
