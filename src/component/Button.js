import React, { useEffect, useState } from "react";
import "./css/Button.css";

function Button({ label, type }) {
  const [bgColor, setBgColor] = useState("#FFF9D3");
  const [textColor, setTextColor] = useState("#FFFFFF");

  useEffect(() => {
    if (type === 1) {
      setBgColor("#6C95FD");
      setTextColor("#FFFFFF");
    } else if (type === 2) {
      setBgColor("#FFFFFF");
      setTextColor("#6C95FD");
    }
  }, [type]);

  return (
    <div
      className="Button"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {label}
    </div>
  );
}

export default Button;
