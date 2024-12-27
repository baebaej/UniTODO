import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./css/Header.css";

import { ReactComponent as Logo } from "../img/logo.svg";
import { ReactComponent as Setting } from "../img/setting.svg";

import { useUserStore } from "../store/userStore";

function Header({ openModal, onClose, setModalNumber }) {
  const name = useUserStore((state) => state.name); // name 가져오기
  const setName = useUserStore((state) => state.setName); // name 업데이트 함수

  const selectModal = () => {
    setModalNumber(5);
    openModal();
  };

  const handleLogout = () => {
    setName("");
    try {
      sessionStorage.removeItem("user");
    } catch {
      return null;
    }
  };

  return (
    <div className="Header">
      <div className="Logo">
        <Logo width={"80px"} height={"80px"}></Logo>
      </div>
      {name && ( // name이 비어있지 않을 때만 렌더링
        <div className="UserInfo">
          <div style={{ marginRight: "5px" }}>
            <Setting
              onClick={selectModal}
              openModal={openModal}
              onClose={onClose}
              setModalNumber={setModalNumber}
            />
          </div>
          <div
            style={{ fontSize: "large", fontWeight: "bold", color: "white" }}
          >
            {name}
          </div>
          <div style={{ marginRight: "25px", color: "#E7EEFF" }}>님</div>
          <Link to="/">
            <div style={{ color: "#B2C7FF" }} onClick={handleLogout}>
              <a style={{ textDecoration: "underline" }}>로그아웃</a>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
