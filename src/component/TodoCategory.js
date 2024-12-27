import React, { useEffect, useState } from "react";
import { useUserStore } from "../store/userStore";

import "./css/TodoCategory.css";

const colorSchemes = [
  { textColor: "#EC7754", bgColor: "#FFF2EE" },
  { textColor: "#DEA20B", bgColor: "#FFF8E7" },
  { textColor: "#82B119", bgColor: "#EFF7DD" },
  { textColor: "#33AD9A", bgColor: "#DAF4F0" },
  { textColor: "#55A258", bgColor: "#D1EAD1" },
  { textColor: "#4D7BE3", bgColor: "#DDE5F7" },
  { textColor: "#A762DA", bgColor: "#F5EDFB" },
];

function TodoCategory({
  categoryId,
  setcategoryId,
  title,
  description,
  openModal,
  closeModal,
  setModalNumber,
  handleCategoryClick,
}) {
  const [randomColorScheme, setRandomColorScheme] = useState(null);
  const { name, isNeedUpdate, setName, setIsNeedUpdate } = useUserStore();

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때만 색상 결정
    const colorScheme =
      colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
    setRandomColorScheme(colorScheme);
  }, []); // 빈 배열을 두 번째 인자로 주어 처음 렌더링될 때만 실행되도록 설정

  if (!randomColorScheme) {
    return null; // 색상이 결정될 때까지는 렌더링하지 않음
  }

  const handleEditbtnClick = (event) => {
    event.stopPropagation(); // 이벤트 전파 중단 (다른 onclick이 실행되는 것을 막음)
    setcategoryId(categoryId);
    setModalNumber(7);
    openModal();
  };

  const token = JSON.parse(sessionStorage.getItem("user")).token;

  const handleDeleteBtnClick = async (event) => {
    event.stopPropagation(); // 이벤트 전파 중단 (다른 onclick이 실행되는 것을 막음)

    if (window.confirm("정말로 삭제하시겠어요?")) {
      try {
        const response = await fetch(`/categories/${categoryId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // 여기에 적절한 토큰을 넣으세요
          },
        });

        if (response.status === 204) {
          alert("카테고리가 성공적으로 삭제되었어요.");
          setIsNeedUpdate(!isNeedUpdate);
        } else {
          alert("카테고리 삭제에 실패했어요.");
        }
      } catch (error) {
        console.error(error);
        alert("오류가 발생했어요. 다시 시도해 주세요.");
      }
    }
  };

  return (
    <div
      className="TodoCategory"
      style={{
        backgroundColor: randomColorScheme.bgColor,
        color: randomColorScheme.textColor,
      }}
      onClick={handleCategoryClick}
    >
      <div className="FirstLine">
        <div className="Title">{title}</div>
        <div className="BtnGroup">
          <div className="btnEdit" onClick={handleEditbtnClick}>
            수정
          </div>
          <div className="btnDelete" onClick={handleDeleteBtnClick}>
            삭제
          </div>
        </div>
      </div>
      <div className="SecondLine">{description}</div>
    </div>
  );
}

export default TodoCategory;
