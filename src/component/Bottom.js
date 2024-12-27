//Bottom bar

import React, { useEffect, useState } from "react";
import "./css/Bottom.css";

import { ReactComponent as AppCenterLogo } from "../img/appcenterlogo.svg";

function Bottom() {
  return (
    <div className="Bottom">
      <AppCenterLogo />
      <div className="Address">
        인천 연수구 아카데미로 119, 인천대학교 4호관 107호
      </div>
    </div>
  );
}

export default Bottom;
