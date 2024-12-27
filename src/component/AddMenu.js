import React, { useState } from "react";
import "./css/AddMenu.css";

import Button from "./Button";

function AddMenu({ openModal, setModalNumber }) {
  const modalSelect1 = () => {
    setModalNumber(2);
    openModal();
  };
  const modalSelect2 = () => {
    setModalNumber(1);
    openModal();
  };

  return (
    <div className="AddMenu">
      <div className="title">+ 추가하기</div>
      <span onClick={modalSelect1}>
        <Button label="TODO 추가" type={1} />
      </span>
      <span onClick={modalSelect2}>
        <Button label="카테고리 추가" type={2} />
      </span>
    </div>
  );
}

export default AddMenu;
