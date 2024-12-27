import React from "react";
import styles from "./Login.module.css"; // CSS 모듈로 변경
import Header from "../component/Header";
import Bottom from "../component/Bottom";
import LoginModal from "../modal/LoginModal";

import { ReactComponent as Logo } from "../img/logo_ver_2.svg";

function Login() {
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
          <LoginModal />
        </div>
      </div>
      <div className={styles.BottomFrame}>
        <Bottom />
      </div>
    </div>
  );
}

export default Login;
