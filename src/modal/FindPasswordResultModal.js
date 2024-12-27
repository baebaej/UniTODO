import React from "react";
import { Link } from "react-router-dom";

import styles from "./FindPasswordResultModal.module.css"; // CSS 모듈 임포트

export default function Main({ NewPassword }) {
  return (
    <div className={styles["main-container"]}>
      <span className={styles["password-recovery"]}>비밀번호 찾기</span>
      <div className={styles["frame-1"]}>
        <div className={styles["frame-2"]}>
          <div className={styles["user-password"]}>
            <span className={styles["uni-email"]}>uni@inu.ac.kr</span>
            <span className={styles["user-password-3"]}> 님의 비밀번호</span>
          </div>
          <span className={styles["unitodo"]}>{NewPassword}</span>
        </div>
        <Link to="/" style={{ textDecoration: "none" }}>
          <button className={styles["frame-4"]}>
            <div className={styles["frame-5"]}>
              <span className={styles["login-link"]}>로그인하러 가기</span>
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
}
