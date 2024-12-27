import React, { useEffect, useState } from "react";
import "./css/StatusTag.css";

function StatusTag({ status }) {
  const [tag, setTag] = useState("시작 전");
  const [bgColor, setBgColor] = useState("#F7F7F7");
  const [textColor, setTextColor] = useState("#999999");

  // status가 변경될 때 상태 업데이트
  useEffect(() => {
    if (status === 1 || status === "PENDING") {
      // 시작 전
      setTag("시작 전");
      setBgColor("#F7F7F7");
      setTextColor("#999999");
    } else if (status === 2 || status === "PROGRESS") {
      // 진행 중
      setTag("진행 중");
      setBgColor("#EBEEFF");
      setTextColor("#5151FF");
    } else if (status === 3 || status === "COMPLETED") {
      // 완료
      setTag("완료");
      setBgColor("#E6FDE9");
      setTextColor("#34CD49");
    } else {
      // 완료
      setTag("알 수 없음");
      setBgColor("#E6FDE9");
      setTextColor("#34CD49");
    }
  }, [status]); // 의존성 배열에 status 추가

  return (
    <div
      className="StatusTag"
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      {tag}
    </div>
  );
}

export default StatusTag;
