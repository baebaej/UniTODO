import React, { useState } from "react";
import classNames from "classnames";
import { useUserStore } from "../store/userStore";

import styles from "./CategoryAddModal.module.css";

import ModalButton from "../component/ModalButton";

export default function Main({ onClose }) {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  const { name, isNeedUpdate, setName, setIsNeedUpdate } = useUserStore();

  // 카테고리 추가 요청 함수
  const handleAddCategory = () => {
    const data = {
      name: categoryName,
      description: categoryDescription,
    };

    const token = JSON.parse(sessionStorage.getItem("user")).token;

    fetch("http://na2ru2.me:5151/categories", {
      method: "POST",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 201) {
          alert("성공적으로 카테고리가 추가되었습니다.");
          setIsNeedUpdate(!isNeedUpdate);
          onClose(); // 카테고리 추가 후 모달 닫기
        } else {
          alert("카테고리 추가에 실패했습니다.");
        }
      })
      .catch((error) => {
        alert("네트워크 오류로 카테고리 추가에 실패했습니다.");
        console.error("Error:", error);
      });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles["main-container"]}>
        <span className={styles["category-add"]}>카테고리 추가하기</span>
        <div className={styles["frame-1"]}>
          <div className={styles["frame-2"]}>
            <div className={styles["frame-3"]}>
              <span className={styles.name}>이름</span>
              <div className={styles["frame-4"]}>
                <input
                  className={classNames(
                    styles["frame-input"],
                    styles["category-name-input"]
                  )}
                  placeholder="카테고리 이름을 입력하세요"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>
            </div>
            <div className={styles["frame-5"]}>
              <span className={styles.description}>설명</span>
              <div className={styles["frame-6"]}>
                <input
                  className={classNames(
                    styles["frame-input"],
                    styles["category-description"]
                  )}
                  placeholder="카테고리 설명을 입력하세요 (선택)"
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className={styles["frame-8"]}>
            <span onClick={onClose}>
              <ModalButton type={1} label="취소"></ModalButton>
            </span>
            <span onClick={handleAddCategory}>
              <ModalButton type={2} label="추가"></ModalButton>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
