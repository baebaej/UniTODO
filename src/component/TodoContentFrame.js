//todo 카드를 담는 세로 스크롤 되는 영역
//todoCard로 이루어짐

import React, { useEffect, useState } from "react";
import "./css/TodoContentFrame.css";

import TodoCard from "./TodoCard";

function TodoContentFrame({ todos, setTaskId, openModal, setModalNumber }) {
  console.log("ㅎㅇ", todos);
  return (
    <div className="TodoContentFrame">
      {todos.map((todo, idx) => (
        <TodoCard
          todo={todo}
          setTaskId={setTaskId}
          openModal={openModal}
          setModalNumber={setModalNumber}
        />
      ))}
    </div>
  );
}

export default TodoContentFrame;
