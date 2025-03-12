import React, { useState } from "react";
import "../styles/tooltip.css"; // Add styles separately

const Tooltip = ({ text, children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="tooltip-container"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && <div className="tooltip">{text}</div>}
    </div>
  );
};

export default Tooltip;
