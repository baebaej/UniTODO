import React, { useEffect, useState } from "react";

import styles from "./FindPassword.module.css"; // CSS 모듈로 변경
import Header from "../component/Header";
import Bottom from "../component/Bottom";

import FindPasswordModal from "../modal/FindPasswordModal";
import FindPasswordResultModal from "../modal/FindPasswordResultModal";

import { ReactComponent as Logo } from "../img/logo_ver_2.svg";

function FindPassword() {
  const [modal, setModal] = useState(1);
  const [NewPassword, setNewPassword] = useState("");

  const setModalto2 = () => {
    setModal(2);
  };

  return (
    <div className={styles.Login}>
      <div className={styles.HeaderFrame}>
        <Header nickname={"유니"} />
      </div>
      <div className={styles.ContentFrame}>
        <div className={styles.LeftComponent}>
          <Logo />
        </div>
        <div className={styles.RightComponent}>
          {modal === 1 && (
            <FindPasswordModal
              setModalto2={setModalto2}
              setNewPassword={setNewPassword}
            />
          )}
          {modal === 2 && <FindPasswordResultModal NewPassword={NewPassword} />}
        </div>
      </div>
      <div className={styles.BottomFrame}>
        <Bottom />
      </div>
    </div>
  );
}

export default FindPassword;
