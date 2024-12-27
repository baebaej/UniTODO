import React, { useState } from "react";
import styles from "./FindPasswordModal.module.css";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";

export default function Main({ setModalto2, setNewPassword }) {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleFindPassword = async () => {
    try {
      const response = await fetch(
        `http://na2ru2.me:5151/users/password/${email}`,
        {
          method: "GET",
        }
      );

      if (response.status === 200) {
        const data = await response.json(); // 서버에서 비밀번호를 반환한다고 가정
        setNewPassword(data.password);
        setModalto2();
      } else {
        alert("일치하는 사용자를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("비밀번호 찾기 요청 중 오류 발생:", error);
      alert("서버와의 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles["main-container"]}>
      <span className={styles.login}>비밀번호 찾기</span>
      <div className={styles["frame-1"]}>
        <div className={styles["frame-2"]}>
          <div className={styles["frame-3"]}>
            <span className={styles.email}>이메일</span>
            <div className={styles["frame-4"]}>
              <span className={styles["email-format"]}>
                *이메일 형식으로 입력하세요
              </span>
              <div className={styles["frame-5"]}>
                <input
                  className={classNames(
                    styles["frame-input"],
                    styles["category-name"]
                  )}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles["frame-a"]}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <button className={styles["frame-button"]}>
              <div className={styles["section-3"]}>
                <span className={styles["text-8"]}>취소</span>
              </div>
            </button>
          </Link>
          <button
            className={styles["frame-button"]}
            onClick={handleFindPassword}
          >
            <div className={styles["section-3"]}>
              <span className={styles["text-8"]}>다음</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
