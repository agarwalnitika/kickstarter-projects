import React, { useState } from "react";
import "../styles/table.css";
import Tooltip from "./Tooltip";
import { tableHeaders } from "../constants/messages";
import { exchangeRates } from "../constants/commonConstants";
import InfoIcon from "./infoIcon";

const Table = ({ projects, selectedCurrency, currentPage }) => {
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

  // Convert amount function with uppercase conversion and numeric conversion
  const convertAmount = (amount, fromCurrency, toCurrency) => {
    const from = fromCurrency.toUpperCase();
    const to = toCurrency.toUpperCase();
    if (from === to) return Math.round(Number(amount));
    if (!exchangeRates[from] || !exchangeRates[to])
      return Math.round(Number(amount));
    return Math.round(
      (Number(amount) / exchangeRates[from]) * exchangeRates[to]
    );
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>
              <div className="th-content">
                <div className="th-title">
                  {tableHeaders.sNo.name}
                  <Tooltip text={tableHeaders.sNo.description}>
                    <InfoIcon />
                  </Tooltip>
                </div>
                <button onClick={() => handleSort("s.no")} className="sort-btn">
                  {renderSortIndicator("s.no")}
                </button>
              </div>
            </th>
            <th>
              <div className="th-content">
                <div className="th-title">
                  {tableHeaders.percentageFunded.name}
                  <Tooltip text={tableHeaders.percentageFunded.description}>
                    <InfoIcon />
                  </Tooltip>
                </div>
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
                <div className="th-title">
                  {tableHeaders.amountPledged.name} ({selectedCurrency})
                  <Tooltip text={tableHeaders.amountPledged.name}>
                    <InfoIcon />
                  </Tooltip>
                </div>
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
          {currentRecords.map((project, index) => {
            const convertedAmount = convertAmount(
              project["amt.pledged"],
              project.currency,
              selectedCurrency
            );
            return (
              <tr key={index}>
                <td>{project["s.no"]}</td>
                <td>{project["percentage.funded"]}%</td>
                <td>{convertedAmount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
