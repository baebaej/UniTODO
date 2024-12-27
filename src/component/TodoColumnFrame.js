//todo의 카테고리별 열 한 줄
//TodoCategory와 TodoContentFrame으로 이루어짐

import React, { useEffect, useState } from "react";
import "./css/TodoColumnFrame.css";

import TodoCategory from "./TodoCategory";
import TodoContentFrame from "./TodoContentFrame";

function TodoColumnFrame({
  key,
  categoryData,
  openModal,
  closeModal,
  setModalNumber,
  setcategoryId,
  setTaskId,
}) {
  const handleCategoryClick = () => {
    setModalNumber(3);
    setcategoryId(categoryData.categoryId);
    openModal();
  };

  return (
    <div className="TodoColumnFrame">
      <span>
        <TodoCategory
          title={categoryData.categoryTitle}
          description={categoryData.categoryDescription}
          categoryId={categoryData.categoryId}
          setcategoryId={setcategoryId}
          openModal={openModal}
          closeModal={closeModal}
          setModalNumber={setModalNumber}
          handleCategoryClick={handleCategoryClick}
        />
      </span>

      <TodoContentFrame
        todos={categoryData.todos}
        setTaskId={setTaskId}
        setModalNumber={setModalNumber}
        openModal={openModal}
      />
    </div>
  );
}

export default TodoColumnFrame;
