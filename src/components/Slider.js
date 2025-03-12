import React from "react";
import "../styles/slider.css";

const DualRangeSlider = ({
  min,
  max,
  lowerValue,
  upperValue,
  onLowerChange,
  onUpperChange,
  unit = "",
}) => {
  return (
    <div className="dual-range-slider">
      <div className="slider-container">
        {/* Lower value slider */}
        <input
          type="range"
          min={min}
          max={max}
          value={lowerValue}
          onChange={onLowerChange}
          className="slider slider-lower"
        />
        {/* Upper value slider */}
        <input
          type="range"
          min={min}
          max={max}
          value={upperValue}
          onChange={onUpperChange}
          className="slider slider-upper"
        />
        {/* Track with progress bar between handles */}
        <div className="slider-track">
          <div
            className="slider-range"
            style={{
              left: ((lowerValue - min) / (max - min)) * 100 + "%",
              right: 100 - ((upperValue - min) / (max - min)) * 100 + "%",
            }}
          ></div>
        </div>
      </div>
      <div className="slider-values">
        <span>
          {lowerValue}
          {unit}
        </span>{" "}
        -{" "}
        <span>
          {upperValue}
          {unit}
        </span>
      </div>
    </div>
  );
};

export default DualRangeSlider;
