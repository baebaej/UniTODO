import React, { useState, useEffect } from "react";
import styles from "./LookupCategoryModal.module.css";
import ModalButton from "../component/ModalButton";
import { useUserStore } from "../store/userStore";

import { ReactComponent as CloseBtn } from "../img/material-symbols_close-rounded.svg";

export default function Main({
  onClose,
  categoryId,
  setModalNumber,
  openModal,
}) {
  const [categoryData, setCategoryData] = useState(null); // API 데이터 상태 추가
  const { name, isNeedUpdate, setName, setIsNeedUpdate } = useUserStore();

  const token = JSON.parse(sessionStorage.getItem("user")).token;

  useEffect(() => {
    // API 요청
    const fetchCategoryData = async () => {
      try {
        const response = await fetch(
          `http://na2ru2.me:5151/categories/${categoryId}`,
          {
            method: "GET",
            headers: {
              Accept: "*/*",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCategoryData(data); // 받아온 데이터 상태에 저장
      } catch (error) {
        console.error("There was an error fetching the category data:", error);
      }
    };

    fetchCategoryData();
  }, [categoryId]); // categoryId가 변경될 때마다 호출

  if (!categoryData) {
    return <div>Loading...</div>; // 데이터 로딩 중일 때 표시
  }

  const handleEditbtnClick = () => {
    setModalNumber(7);
    openModal();
  };

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
          onClose();
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
    <div className={styles.overlay}>
      <div className={styles["main-container"]}>
        <span className={styles["category-view"]}>카테고리 조회</span>
        <span onClick={onClose} className={styles["close-button"]}>
          <CloseBtn />
        </span>
        <div className={styles["frame-1"]}>
          <div className={styles["frame-2"]}>
            <div className={styles["frame-3"]}>
              <span className={styles.name}>이름</span>
              <div className={styles["frame-4"]}>{categoryData.name}</div>
            </div>
            <div className={styles["frame-5"]}>
              <span className={styles.description}>설명</span>
              <div className={styles["frame-6"]}>
                {categoryData.description}
              </div>
            </div>
          </div>
          <div className={styles["frame-8"]}>
            <span onClick={handleEditbtnClick}>
              <ModalButton type={1} label="수정"></ModalButton>
            </span>
            <span onClick={handleDeleteBtnClick}>
              <ModalButton type={3} label="삭제"></ModalButton>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
