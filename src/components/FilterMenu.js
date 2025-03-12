import React, { useState, useEffect } from "react";

const FilterMenu = ({
  selectedCurrencies,
  setSelectedCurrencies,
  selectedCountries,
  setSelectedCountries,
  minPledged,
  setMinPledged,
  maxPledged,
  setMaxPledged,
  minFunded,
  setMinFunded,
  maxFunded,
  setMaxFunded,
  projects,
  exchangeRates,
}) => {
  // Available filtering options
  const availableCurrencies = ["USD", "CAD", "EUR", "GBP", "AUD", "CHF", "DKK"];
  const availableCountries = [...new Set(projects.map((p) => p.country))];

  // User-selected currency for conversion
  const [selectedConversionCurrency, setSelectedConversionCurrency] =
    useState("USD");
  const [minPledgedPlaceholder, setMinPledgedPlaceholder] = useState("0.00");
  const [maxPledgedPlaceholder, setMaxPledgedPlaceholder] = useState("0.00");
  const [minFundedPlaceholder, setMinFundedPlaceholder] = useState("0");
  const [maxFundedPlaceholder, setMaxFundedPlaceholder] = useState("0");

  // Convert amounts based on selected currency
  const convertAmount = (amount, fromCurrency) => {
    if (!amount || !fromCurrency || !exchangeRates[fromCurrency]) return amount;
    if (fromCurrency === selectedConversionCurrency) return amount;

    return (
      (amount / exchangeRates[fromCurrency]) *
      exchangeRates[selectedConversionCurrency]
    );
  };

  // Update placeholders whenever currency selection changes
  useEffect(() => {
    const pledgedValues = projects.map((p) =>
      convertAmount(p["amt.pledged"], p.currency)
    );
    const fundedValues = projects.map((p) => p["percentage.funded"]);

    setMinPledgedPlaceholder(
      pledgedValues.length ? Math.min(...pledgedValues).toFixed(2) : "0.00"
    );
    setMaxPledgedPlaceholder(
      pledgedValues.length ? Math.max(...pledgedValues).toFixed(2) : "0.00"
    );

    setMinFundedPlaceholder(
      fundedValues.length ? Math.min(...fundedValues) : "0"
    );
    setMaxFundedPlaceholder(
      fundedValues.length ? Math.max(...fundedValues) : "0"
    );
  }, [selectedConversionCurrency, projects, exchangeRates]);

  // Toggle selected checkboxes
  const toggleSelected = (list, setList, value) => {
    setList(
      list.includes(value)
        ? list.filter((item) => item !== value)
        : [...list, value]
    );
  };

  return (
    <div className="filter-menu">
      <h3>Filters</h3>

      {/* Country Filter (Checkboxes) */}
      <div className="filter-group">
        <h4>Country</h4>
        {availableCountries.map((country) => (
          <label key={country}>
            <input
              type="checkbox"
              checked={selectedCountries.includes(country)}
              onChange={() =>
                toggleSelected(selectedCountries, setSelectedCountries, country)
              }
            />
            {country}
          </label>
        ))}
      </div>

      {/* Amount Pledged Filter */}
      <div className="filter-group">
        <h4>Amount Pledged</h4>

        {/* Currency selection for conversion */}
        <select
          value={selectedConversionCurrency}
          onChange={(e) => setSelectedConversionCurrency(e.target.value)}
        >
          {availableCurrencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>

        {/* Min & Max Input Fields */}
        <input
          type="number"
          placeholder={`Min`}
          value={minPledged}
          onChange={(e) => setMinPledged(e.target.value)}
        />
        <input
          type="number"
          placeholder={`Max`}
          value={maxPledged}
          onChange={(e) => setMaxPledged(e.target.value)}
        />
      </div>

      {/* Percentage Funded Filter */}
      <div className="filter-group">
        <h4>Percentage Funded</h4>
        <input
          type="number"
          placeholder={`Min: ${minFundedPlaceholder}%`}
          value={minFunded}
          onChange={(e) => setMinFunded(e.target.value)}
        />
        <input
          type="number"
          placeholder={`Max: ${maxFundedPlaceholder}%`}
          value={maxFunded}
          onChange={(e) => setMaxFunded(e.target.value)}
        />
      </div>
    </div>
  );
};

export default FilterMenu;
