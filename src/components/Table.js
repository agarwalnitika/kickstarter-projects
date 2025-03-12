import React, { useState } from "react";
import PaginationButton from "./PaginationButton";
import "../styles/style.css";
import { formatCurrency } from "../utils/formatCurrency";
import Tooltip from "./Tooltip";
import FilterMenu from "./FilterMenu";

const Table = ({ projects }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ column: null, order: "asc" });
  const [selectedCurrencies, setSelectedCurrencies] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [minPledged, setMinPledged] = useState("");
  const [maxPledged, setMaxPledged] = useState("");
  const [minFunded, setMinFunded] = useState("");
  const [maxFunded, setMaxFunded] = useState("");
  const recordsPerPage = 5;

  // Filtering Logic
  let filteredData = projects.filter((project) => {
    const matchesCurrency =
      selectedCurrencies.length === 0 ||
      selectedCurrencies.includes(project.currency);
    const matchesCountry =
      selectedCountries.length === 0 ||
      selectedCountries.includes(project.country);
    const matchesPledged =
      (!minPledged || project["amt.pledged"] >= minPledged) &&
      (!maxPledged || project["amt.pledged"] <= maxPledged);
    const matchesFunded =
      (!minFunded || project["percentage.funded"] >= minFunded) &&
      (!maxFunded || project["percentage.funded"] <= maxFunded);

    return matchesCurrency && matchesCountry && matchesPledged && matchesFunded;
  });

  // Sorting Logic
  if (sortConfig.column) {
    filteredData.sort((a, b) => {
      if (a[sortConfig.column] < b[sortConfig.column]) {
        return sortConfig.order === "asc" ? -1 : 1;
      }
      if (a[sortConfig.column] > b[sortConfig.column]) {
        return sortConfig.order === "asc" ? 1 : -1;
      }
      return 0;
    });
  }

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

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

  const exchangeRates = {
    USD: 1,
    CAD: 1.35,
    EUR: 0.92,
    GBP: 0.78,
    AUD: 1.5,
    CHF: 0.9,
    DKK: 6.89,
  };

  return (
    <div className="table-wrapper">
      {/* Sidebar Filters */}
      <FilterMenu
        selectedCurrencies={selectedCurrencies}
        setSelectedCurrencies={setSelectedCurrencies}
        selectedCountries={selectedCountries}
        setSelectedCountries={setSelectedCountries}
        minPledged={minPledged}
        setMinPledged={setMinPledged}
        maxPledged={maxPledged}
        setMaxPledged={setMaxPledged}
        minFunded={minFunded}
        setMinFunded={setMinFunded}
        maxFunded={maxFunded}
        setMaxFunded={setMaxFunded}
        projects={projects}
        exchangeRates={exchangeRates}
      />

      <div className="table-container">
        <table border={1}>
          <thead>
            <tr>
              <th>
                <Tooltip text="Serial Number">S.No</Tooltip>
                <button onClick={() => handleSort("s.no")} className="sort-btn">
                  {renderSortIndicator("s.no")}
                </button>
              </th>
              <th>
                <Tooltip text="Percentage of funding received">
                  Percentage Funded
                </Tooltip>
                <button
                  onClick={() => handleSort("percentage.funded")}
                  className="sort-btn"
                >
                  {renderSortIndicator("percentage.funded")}
                </button>
              </th>
              <th>
                <Tooltip text="Total amount pledged">Amount Pledged</Tooltip>
                <button
                  onClick={() => handleSort("amt.pledged")}
                  className="sort-btn"
                >
                  {renderSortIndicator("amt.pledged")}
                </button>
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
