import React, { useEffect, useState } from "react";
import "./css/ModalButton.css";

function ModalButton({ label, type }) {
  const [bgColor, setBgColor] = useState("#FFF9D3");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [borderColor, setBorderColor] = useState("#6c95fd");

  useEffect(() => {
    if (type === 1) {
      setBgColor("#FFFFFF");
      setTextColor("#6C95FD");
    } else if (type === 2) {
      setBgColor("#6C95FD");
      setTextColor("#FFFFFF");
    } else if (type === 3) {
      setBgColor("#FF6464");
      setTextColor("#FFFFFF");
      setBorderColor("#FF6464");
    }
  }, [type]);

  return (
    <div
      className="ModalButton"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        borderColor: borderColor,
      }}
    >
      {label}
    </div>
  );
}

export default ModalButton;
