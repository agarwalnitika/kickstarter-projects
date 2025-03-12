import React, { useState, useEffect } from "react";
import "../styles/filterMenu.css";

const FilterMenu = ({
  selectedCountries,
  setSelectedCountries,
  selectedCurrencies,
  setSelectedCurrencies,
  minPledged,
  setMinPledged,
  maxPledged,
  setMaxPledged,
  minFunded,
  setMinFunded,
  maxFunded,
  setMaxFunded,
  projects,
}) => {
  const availableCountries = [...new Set(projects.map((p) => p.country))];
  const availableCurrencies = [...new Set(projects.map((p) => p.currency))];

  const [showCountries, setShowCountries] = useState(false);

  const toggleSelected = (list, setList, value) => {
    setList(
      list.includes(value)
        ? list.filter((item) => item !== value)
        : [...list, value]
    );
  };

  return (
    <div className="filter-menu">
      <h3 className="filter-title">Filters</h3>

      {/* Country Filter - Accordion */}
      <div className="filter-section">
        <button
          className="accordion-btn"
          onClick={() => setShowCountries(!showCountries)}
        >
          Country {showCountries ? "▲" : "▼"}
        </button>
        <div className={`accordion-content ${showCountries ? "show" : ""}`}>
          {availableCountries.map((country) => (
            <label key={country} className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedCountries.includes(country)}
                onChange={() =>
                  toggleSelected(
                    selectedCountries,
                    setSelectedCountries,
                    country
                  )
                }
                className="checkbox-input"
              />
              {country}
            </label>
          ))}
        </div>
      </div>

      {/* Amount Pledged Filter */}
      <div className="filter-section">
        <h4 className="filter-label">Amount Pledged</h4>
        <select
          value={selectedCurrencies}
          onChange={(e) => setSelectedCurrencies(e.target.value)}
          className="currency-select"
        >
          <option value="">All Currencies</option>
          {availableCurrencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>

        <div className="input-group">
          <input
            type="number"
            placeholder="Min Amount"
            value={minPledged}
            onChange={(e) => setMinPledged(e.target.value)}
            className="input-box"
          />
          <input
            type="number"
            placeholder="Max Amount"
            value={maxPledged}
            onChange={(e) => setMaxPledged(e.target.value)}
            className="input-box"
          />
        </div>
      </div>

      {/* Percentage Funded Filter */}
      <div className="filter-section">
        <h4 className="filter-label">Percentage Funded</h4>
        <div className="input-group">
          <input
            type="number"
            placeholder="Min %"
            value={minFunded}
            onChange={(e) => setMinFunded(e.target.value)}
            className="input-box"
          />
          <input
            type="number"
            placeholder="Max %"
            value={maxFunded}
            onChange={(e) => setMaxFunded(e.target.value)}
            className="input-box"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterMenu;
