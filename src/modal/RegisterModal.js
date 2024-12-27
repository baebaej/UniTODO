import React, { useState } from "react";
import styles from "./RegisterModal.module.css";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";

export default function Main() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch("http://na2ru2.me:5151/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, password }),
      });

      if (response.status === 201) {
        alert("회원가입 성공!");
        navigate("/"); // 성공 시 메인 화면으로 이동
      } else {
        alert("회원가입 실패. 가입 조건을 확인하고 다시 시도하세요.");
        console.log(response);
      }
    } catch (error) {
      console.error("회원가입 요청 중 오류 발생:", error);
      alert("서버와의 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles["main-container"]}>
      <span className={styles.login}>회원가입</span>
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
          <div className={styles["frame-6"]}>
            <span className={styles.password}>비밀번호</span>
            <div className={styles["frame-7"]}>
              <span className={styles["input-validation"]}>
                *영어, 숫자를 포함하여 8자리 이상 입력하세요
              </span>
              <div className={styles["frame-8"]}>
                <input
                  className={classNames(
                    styles["frame-input-9"],
                    styles["category-name"]
                  )}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className={styles["frame-6"]}>
            <span className={styles.password}>닉네임</span>
            <div className={styles["frame-7"]}>
              <span className={styles["input-validation"]}>
                *최소 2자 이상 입력하세요
              </span>
              <div className={styles["frame-8"]}>
                <input
                  className={classNames(
                    styles["frame-input-9"],
                    styles["category-name-input"]
                  )}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
          <button className={styles["frame-button"]} onClick={handleRegister}>
            <div className={styles["section-3"]}>
              <span className={styles["text-8"]}>회원가입</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
