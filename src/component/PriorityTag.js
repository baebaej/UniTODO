import React, { useEffect, useState } from "react";
import "./css/PriorityTag.css";

function PriorityTag({ priority }) {
  const [tag, setTag] = useState("보통");
  const [bgColor, setBgColor] = useState("#FFF9D3");
  const [textColor, setTextColor] = useState("#CAB006");
  const [icoColor, setIcoColor] = useState("#FCD200");

  // priority가 변경될 때 상태 업데이트
  useEffect(() => {
    if (priority === 1 || priority === "BOTTOM") {
      // 보통
      setTag("보통");
      setBgColor("#FFF9D3");
      setTextColor("#CAB006");
      setIcoColor("#FCD200");
    } else if (priority === 2 || priority === "MIDDLE") {
      // 조금 높음
      setTag("조금 높음");
      setBgColor("#FFEAD3");
      setTextColor("#E37804");
      setIcoColor("#FFA038");
    } else if (priority === 3 || priority === "TOP") {
      // 아주 높음
      setTag("아주 높음");
      setBgColor("#FFD3D3");
      setTextColor("#E12200");
      setIcoColor("#FF674C");
    } else {
      // 아주 높음
      setTag("알 수 없음");
      setBgColor("#FFD3D3");
      setTextColor("#E12200");
      setIcoColor("#FF674C");
    }
  }, [priority]); // 의존성 배열에 priority 추가

  return (
    <div
      className="PriorityTag"
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      <span
        className="icon"
        style={{
          color: icoColor,
        }}
      >
        ●
      </span>
      {tag}
    </div>
  );
}

export default PriorityTag;
