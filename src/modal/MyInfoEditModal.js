import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { Link, useNavigate } from "react-router-dom";

import styles from "./MyInfoModal.module.css";
import { useUserStore } from "../store/userStore";

import ModalButton from "../component/ModalButton";

export default function Main({ onClose, openModal, setModalNumber }) {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    createdAt: "",
  });
  const [password, setPassword] = useState(""); // 비밀번호 입력 필드 추가

  const name = useUserStore((state) => state.name); // name 가져오기
  const setName = useUserStore((state) => state.setName); // name 업데이트 함수

  const navigate = useNavigate();

  useEffect(() => {
    setName("");
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

  const handleUpdate = async () => {
    if (password === "") {
      alert("비밀번호를 입력하세요!");
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!passwordRegex.test(password)) {
      alert("비밀번호는 영어와 숫자를 포함하여 8자 이상이어야 합니다.");
      return;
    }
    try {
      const auth = JSON.parse(sessionStorage.getItem("user")).token;
      const requestBody = {
        email: userData.email,
        name: userData.name,
        password,
      };

      const response = await fetch("http://na2ru2.me:5151/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();

      if (response.ok) {
        alert("수정 성공");
        console.log("수정 결과");
        console.log(requestBody);
        console.log(data);
        let userData = sessionStorage.getItem("user");

        // JSON 문자열을 JavaScript 객체로 변환
        if (userData) {
          let userObj = JSON.parse(userData);

          // 'name' 속성 수정
          userObj.name = requestBody.name;

          // 수정된 객체를 다시 JSON 문자열로 변환 후 저장
          sessionStorage.setItem("user", JSON.stringify(userObj));
        } else {
          console.log("user 데이터가 없습니다.");
        }
        setName(requestBody.name);
        onClose();
      } else {
        alert("수정 실패");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("오류 발생");
    }
  };

  const token = JSON.parse(sessionStorage.getItem("user")).token;

  const handleRemoveUserBtn = async (event) => {
    if (
      window.confirm(
        "탈퇴하시면 모든 데이터는 삭제되며 복구할 수 없어요.\n정말 탈퇴하시겠어요?"
      )
    ) {
      try {
        const response = await fetch(`/users`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 204) {
          alert(
            "회원 탈퇴가 정상적으로 완료되었어요.\n로그인 화면으로 이동합니다."
          );
          let userData = sessionStorage.getItem("user");

          // JSON 문자열을 JavaScript 객체로 변환
          if (userData) {
            let userObj = JSON.parse(userData);

            // 'name' 속성 수정
            userObj.name = "";

            // 수정된 객체를 다시 JSON 문자열로 변환 후 저장
            sessionStorage.setItem("user", JSON.stringify(userObj));
          } else {
            console.log("user 데이터가 없습니다.");
          }
          setName("");

          navigate("/"); // 메인 화면으로 이동
        } else {
          alert("회원 탈퇴를 실패했어요.");
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
        <span className={styles["my-info"]}>내 정보 수정</span>
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
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, name: e.target.value }))
                  }
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
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className={styles["frame-9"]}>
              <span className={styles["join-date"]}>비밀번호</span>
              <div className={styles["frame-a"]}>
                <input
                  className={classNames(
                    styles["frame-input-b"],
                    styles["category-name-input-c"]
                  )}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  type="password"
                />
              </div>
            </div>
            <div
              className={styles["removeUserBtn"]}
              onClick={handleRemoveUserBtn}
            >
              탈퇴하기
            </div>
          </div>
          <div className={styles["frame-d"]}>
            <span onClick={onClose}>
              <ModalButton type={1} label="취소"></ModalButton>
            </span>
            <span onClick={handleUpdate}>
              <ModalButton type={2} label="저장"></ModalButton>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
