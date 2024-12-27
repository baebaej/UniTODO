import React, { useState, useEffect } from "react";
import styles from "./LookupCategoryModal.module.css";
import ModalButton from "../component/ModalButton";
import { useUserStore } from "../store/userStore";

import { ReactComponent as CloseBtn } from "../img/material-symbols_close-rounded.svg";

export default function Main({ onClose, categoryId }) {
  const [categoryData, setCategoryData] = useState(null); // API 데이터 상태 추가
  const { name, isNeedUpdate, setName, setIsNeedUpdate } = useUserStore();

  const token = JSON.parse(sessionStorage.getItem("user")).token;

  useEffect(() => {
    // API 요청 - 수정 전 초기 값 불러오기
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

  // 입력 필드 수정 가능하게 설정
  const handleInputChange = (e, field) => {
    setCategoryData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  const handleEditbtnClick = () => {
    console.log("수정버튼");
    console.log(categoryData);
    fetchEditCategoryData();
  };

  // API 요청 - 수정버튼 눌렸을 때 서버에 수정된 정보 전달
  const fetchEditCategoryData = async () => {
    try {
      const response = await fetch(
        `http://na2ru2.me:5151/categories/${categoryId}`,
        {
          method: "PUT",
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(categoryData),
        }
      );

      if (response.ok) {
        // 성공 시 200 응답이 오면
        alert("카테고리 수정이 성공적으로 완료되었습니다.");
        setIsNeedUpdate(!isNeedUpdate);
        onClose();
      } else {
        // 200 외의 다른 응답 코드일 경우
        alert("카테고리 수정에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("There was an error fetching the category data:", error);
      alert("카테고리 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles["main-container"]}>
        <span className={styles["category-view"]}>카테고리 수정</span>
        <span onClick={onClose} className={styles["close-button"]}>
          <CloseBtn />
        </span>
        <div className={styles["frame-1"]}>
          <div className={styles["frame-2"]}>
            <div className={styles["frame-3"]}>
              <span className={styles.name}>이름</span>
              <div className={styles["frame-4"]}>
                <input
                  className={styles["frame-input"]}
                  value={categoryData.name}
                  onChange={(e) => handleInputChange(e, "name")}
                  style={{
                    textAlign: "left",
                    verticalAlign: "top",
                  }}
                />
              </div>
            </div>
            <div className={styles["frame-5"]}>
              <span className={styles.description}>설명</span>
              <div className={styles["frame-desc"]}>
                <input
                  className={styles["frame-input"]}
                  value={categoryData.description}
                  onChange={(e) => handleInputChange(e, "description")}
                  style={{ textAlign: "left", verticalAlign: "top" }}
                />
              </div>
            </div>
          </div>
          <div className={styles["frame-8"]}>
            <span onClick={onClose}>
              <ModalButton type={1} label="취소"></ModalButton>
            </span>
            <span onClick={handleEditbtnClick}>
              <ModalButton type={2} label="저장"></ModalButton>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
