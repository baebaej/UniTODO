import React, { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./MyInfoModal.module.css";
import { useUserStore } from "../store/userStore";

import ModalButton from "../component/ModalButton";

export default function Main({ onClose, openModal, setModalNumber }) {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    createdAt: "",
  });
  const name = useUserStore((state) => state.name); // name 가져오기
  const setName = useUserStore((state) => state.setName); // name 업데이트 함수

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://na2ru2.me:5151/users/name/${name}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUserData({
          name: data.name,
          email: data.email,
          createdAt: new Date(data.createdAt).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleEditBtnClick = () => {
    setModalNumber(6);
    openModal();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles["main-container"]}>
        <span className={styles["my-info"]}>내 정보</span>
        <div className={styles["frame-1"]}>
          <div className={styles["frame-2"]}>
            <div className={styles["frame-3"]}>
              <span className={styles["nick-name"]}>닉네임</span>
              <div className={styles["frame-4"]}>
                <input
                  className={classNames(
                    styles["frame-input"],
                    styles["category-name-input"]
                  )}
                  value={userData.name}
                  readOnly
                />
              </div>
            </div>
            <div className={styles["frame-5"]}>
              <span className={styles.email}>이메일</span>
              <div className={styles["frame-6"]}>
                <input
                  className={classNames(
                    styles["frame-input-7"],
                    styles["category-name-input-8"]
                  )}
                  value={userData.email}
                  readOnly
                />
              </div>
            </div>
            <div className={styles["frame-9"]}>
              <span className={styles["join-date"]}>가입일</span>
              <div className={styles["frame-a"]}>
                <input
                  className={classNames(
                    styles["frame-input-b"],
                    styles["category-name-input-c"]
                  )}
                  value={userData.createdAt}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className={styles["frame-d"]}>
            <span onClick={onClose}>
              <ModalButton
                onClick={onClose}
                type={1}
                label="닫기"
              ></ModalButton>
            </span>
            <span onClick={handleEditBtnClick}>
              <ModalButton type={2} label="수정"></ModalButton>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
