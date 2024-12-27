import React from "react";
import "./css/TodoCard.css";

import PriorityTag from "./PriorityTag";
import StatusTag from "./StatusTag";

import { ReactComponent as Calendar } from "../img/calendar.svg";

function Dday({ todo }) {
  // D-몇 형식으로 디데이 계산
  const calculateDDay = (dateString) => {
    const dueDate = new Date(dateString);
    const today = new Date();
    const timeDiff = dueDate - today; // 밀리초 단위 차이
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // 밀리초를 일수로 변환
    return `D${dayDiff >= 0 ? `-${dayDiff}` : `+${Math.abs(dayDiff)}`}`;
  };
  return <span className="Dday">{calculateDDay(todo.dueDate)}</span>;
}

function TodoCard({ todo, setTaskId, openModal, setModalNumber }) {
  // dueDate를 "2024년 12월 25일" 형태로 변환
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줘야 함
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  };

  const handleClickCard = () => {
    setTaskId(todo.taskId);
    setModalNumber(4);
    openModal();
  };

  const handleClickEditBtn = (event) => {
    event.stopPropagation(); // 이벤트 전파 중단 (다른 onclick이 실행되는 것을 막음)

    setTaskId(todo.taskId);
    setModalNumber(8);
    openModal();
  };

  return (
    <div className="TodoCard" onClick={handleClickCard}>
      <div className="FirstLine">{todo.title}</div>
      <div className="SecondLine">
        <Calendar />
        {formatDate(todo.dueDate)}
        <Dday todo={todo} />
      </div>
      <div className="ThirdLine">
        <PriorityTag priority={todo.priority} />
        <StatusTag status={todo.status} />
        <span className="edit" onClick={handleClickEditBtn}>
          수정하기
        </span>
      </div>
    </div>
  );
}

export default TodoCard;
