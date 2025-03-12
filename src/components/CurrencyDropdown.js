import React from "react";
import "../styles/currencyDropdown.css";

const CurrencyDropdown = ({ selectedCurrency, setSelectedCurrency }) => {
  const availableCurrencies = ["USD", "CAD", "EUR", "GBP", "AUD", "CHF", "DKK"];

  return (
    <div className="currency-dropdown">
      <div className="currency-dropdown-button ">
        <select
          id="currencySelect"
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
          className="dropdown-select"
        >
          {availableCurrencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CurrencyDropdown;
