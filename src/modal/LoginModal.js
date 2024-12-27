import React, { useState } from "react";
import styles from "./LoginModal.module.css";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";

import { useUserStore } from "../store/userStore";

export default function Main() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const name = useUserStore((state) => state.name); // name 가져오기
  const setName = useUserStore((state) => state.setName); // name 업데이트 함수

  const handleLogin = async () => {
    try {
      const loginResponse = await fetch("http://na2ru2.me:5151/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (loginResponse.status === 200) {
        const loginData = await loginResponse.json();

        const sessionData = {
          token: loginData.token,
          name: loginData.name,
        };
        sessionStorage.setItem("user", JSON.stringify(sessionData));
        setName(sessionData.name);

        alert(`환영합니다, ${sessionData.name}님!`);
        navigate("/main"); // 메인 화면으로 이동
      } else {
        alert("아이디 또는 비밀번호를 확인해주세요.");
      }
    } catch (error) {
      console.error("로그인 요청 중 오류 발생:", error);
      alert("서버와의 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles["main-container"]}>
      <span className={styles.login}>로그인</span>
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
                    styles["category-name-input"]
                  )}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles["frame-a"]}>
          <button className={styles["frame-button"]} onClick={handleLogin}>
            <div className={styles["section-3"]}>
              <span className={styles["text-8"]}>로그인</span>
            </div>
          </button>
          <div className={styles["section-4"]}>
            <Link to="/register">
              <button className={styles["Button-2"]}>회원가입</button>
            </Link>
            <Link to="/findpassword">
              <button className={styles["Button-3"]}>비밀번호 찾기</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
