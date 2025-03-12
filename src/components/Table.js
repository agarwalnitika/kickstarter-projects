import React, { useState } from "react";
import "../styles/table.css";
import { formatCurrency } from "../utils/currencyExchangeHelper";
import Tooltip from "./Tooltip";
import { tableHeaders } from "../constants/messages";

const Table = ({ projects, selectedCurrency }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ column: null, order: "asc" });

  const recordsPerPage = 5;

  // Sorting Logic
  if (sortConfig.column) {
    projects.sort((a, b) => {
      if (a[sortConfig.column] < b[sortConfig.column]) {
        return sortConfig.order === "asc" ? -1 : 1;
      }
      if (a[sortConfig.column] > b[sortConfig.column]) {
        return sortConfig.order === "asc" ? 1 : -1;
      }
      return 0;
    });
  }

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = projects.slice(indexOfFirstRecord, indexOfLastRecord);

  // Handle Sorting
  const handleSort = (column) => {
    setSortConfig((prevConfig) => {
      if (prevConfig.column === column) {
        return { column, order: prevConfig.order === "asc" ? "desc" : "asc" };
      }
      return { column, order: "asc" };
    });
  };

  // Render Sort Indicators
  const renderSortIndicator = (column) => {
    if (sortConfig.column === column) {
      return sortConfig.order === "asc" ? " ▲" : " ▼";
    }
    return " ⬍";
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>
              <div className="th-content">
                <Tooltip text={tableHeaders.sNo.description}>
                  {tableHeaders.sNo.name}
                </Tooltip>
                <button onClick={() => handleSort("s.no")} className="sort-btn">
                  {renderSortIndicator("s.no")}
                </button>
              </div>
            </th>
            <th>
              <div className="th-content">
                <Tooltip text={tableHeaders.percentageFunded.description}>
                  {tableHeaders.percentageFunded.name}
                </Tooltip>
                <button
                  onClick={() => handleSort("percentage.funded")}
                  className="sort-btn"
                >
                  {renderSortIndicator("percentage.funded")}
                </button>
              </div>
            </th>
            <th>
              <div className="th-content">
                <Tooltip text={tableHeaders.amountPledged.name}>
                  {tableHeaders.amountPledged.name}
                </Tooltip>
                <button
                  onClick={() => handleSort("amt.pledged")}
                  className="sort-btn"
                >
                  {renderSortIndicator("amt.pledged")}
                </button>
              </div>
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
  );
};

export default Table;
