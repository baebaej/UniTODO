import React, { useEffect, useState } from "react";
import "./css/TodoList.css";
import TodoColumnFrame from "./TodoColumnFrame";

import { useUserStore } from "../store/userStore";

function TodoList({
  openModal,
  closeModal,
  setModalNumber,
  setcategoryId,
  setTaskId,
}) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { name, isNeedUpdate, setName, setIsNeedUpdate } = useUserStore();

  const token = JSON.parse(sessionStorage.getItem("user")).token;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://na2ru2.me:5151/categories", {
          method: "GET",
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // 각 카테고리마다 해당하는 할 일 리스트를 가져오기 위한 추가 요청
        const categoriesWithTodos = await Promise.all(
          data.map(async (category) => {
            // 각 카테고리에 대한 할 일 데이터를 가져오는 요청
            const todosResponse = await fetch(
              `http://na2ru2.me:5151/tasks/category/${category.categoryId}`,
              {
                method: "GET",
                headers: {
                  accept: "*/*",
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (!todosResponse.ok) {
              throw new Error(`HTTP error! status: ${todosResponse.status}`);
            }

            const todosData = await todosResponse.json();

            // 카테고리 데이터를 기존 데이터에 todos 추가
            return {
              categoryId: category.categoryId,
              categoryTitle: category.name,
              categoryDescription: category.description,
              todos: todosData, // 할 일 목록 추가
            };
          })
        );

        setCategories(categoriesWithTodos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [isNeedUpdate]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error}</div>;

  return (
    <div className="TodoList">
      {categories.map((category, index) => (
        <TodoColumnFrame
          key={index}
          categoryData={category}
          openModal={openModal}
          closeModal={closeModal}
          setModalNumber={setModalNumber}
          setcategoryId={setcategoryId}
          setTaskId={setTaskId}
        />
      ))}
    </div>
  );
}

export default TodoList;
