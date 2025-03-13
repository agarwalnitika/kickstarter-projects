import React, { useEffect, useState } from "react";
import {
  exchangeRates,
  MAX_RECORDS_PER_PAGE,
} from "../constants/commonConstants";
import "../styles/style.css";
import "../styles/table.css";
import FilterMenu from "./FilterMenu";
import PaginationComponent from "./PaginationWrapper";
import Table from "./Table";
import CurrencyDropdown from "./CurrencyDropdown";

const ContentWrapper = ({ projects }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [minPledged, setMinPledged] = useState("");
  const [maxPledged, setMaxPledged] = useState("");
  const [minFunded, setMinFunded] = useState("");
  const [maxFunded, setMaxFunded] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const recordsPerPage = MAX_RECORDS_PER_PAGE;

  // Filtering Logic
  let filteredProjectsData = projects.filter((project) => {
    const matchesPledged =
      (!minPledged || project["amt.pledged"] >= minPledged) &&
      (!maxPledged || project["amt.pledged"] <= maxPledged);
    const matchesFunded =
      (!minFunded || project["percentage.funded"] >= minFunded) &&
      (!maxFunded || project["percentage.funded"] <= maxFunded);

    return matchesPledged && matchesFunded;
  });

  const totalPages = Math.ceil(filteredProjectsData.length / recordsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [filteredProjectsData, totalPages]);

  return (
    <div className="content-wrapper">
      <CurrencyDropdown
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
      />
      <div className="table-wrapper">
        <FilterMenu
          minPledged={minPledged}
          setMinPledged={setMinPledged}
          maxPledged={maxPledged}
          setMaxPledged={setMaxPledged}
          minFunded={minFunded}
          setMinFunded={setMinFunded}
          maxFunded={maxFunded}
          setMaxFunded={setMaxFunded}
          exchangeRates={exchangeRates}
          selectedCurrency={selectedCurrency}
        />
        <div className="table-card-wrapper">
          <div className="inner-wrapper">
            <Table
              projects={filteredProjectsData}
              selectedCurrency={selectedCurrency}
              currentPage={currentPage}
            />
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentWrapper;
