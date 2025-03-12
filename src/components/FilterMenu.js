import React, { useState } from "react";
import "../styles/filterMenu.css";

const FilterMenu = ({
  minPledged,
  setMinPledged,
  maxPledged,
  setMaxPledged,
  minFunded,
  setMinFunded,
  maxFunded,
  setMaxFunded,
  selectedCurrency,
}) => {
  return (
    <div className="filter-menu">
      <h3 className="filter-title">Filters</h3>

      {/* Amount Pledged Filter */}
      <div className="filter-section">
        <h4 className="filter-label">Amount Pledged ({selectedCurrency})</h4>

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
