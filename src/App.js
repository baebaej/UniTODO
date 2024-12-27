import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

// 페이지 컴포넌트 임포트
import Login from "./pages/Login";
import Register from "./pages/Register";
import FindPassword from "./pages/FindPassword";
import Main from "./pages/Main";

// 유저 상태 관리
import { useUserStore } from "./store/userStore"; // 상태 관리 스토어 임포트

function ProtectedRoute({ element }) {
  const name = useUserStore((state) => state.name); // 상태에서 name 가져오기
  const setName = useUserStore((state) => state.setName); // name 업데이트 함수

  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 세션 스토리지에서 안전하게 데이터 가져오기
  const user = (() => {
    try {
      return JSON.parse(sessionStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const token = user?.token || null; //세션스토리지에서 user가 정상적으로 불러와졌는지에 따라 토큰 저장

  useEffect(() => {
    const checkAuthorization = async () => {
      if (!token) {
        //토큰이 없으면 invalid한 것임.
        setIsValid(false);
        setIsLoading(false);
        return;
      }

      try {
        //토큰이 있는 경우 valid한 토큰인지 요청을 보내서 확인해본다
        const response = await fetch("http://na2ru2.me:5151/categories", {
          method: "GET",
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          //응답이 200으로 오면 valid한 토큰을 가지고 있음
          setIsValid(true);
        } else {
          //아니면 invalid
          setIsValid(false);
        }
      } catch (error) {
        setIsValid(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthorization();
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>; // 로딩 상태 표시
  }

  // 유효하지 않은 경우 리디렉션
  if (!isValid) {
    alert("유효하지 않은 접근입니다. 로그인 화면으로 돌아갑니다.");
    try {
      sessionStorage.removeItem("user");
    } catch {
      console.error("세션 스토리지에서 데이터를 삭제할 수 없습니다.");
    }
    setName("");
    return <Navigate to="/" replace />;
  }

  if (user?.name) {
    setName(user.name);
  }

  return element;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/findpassword" element={<FindPassword />} />
        <Route path="/main" element={<ProtectedRoute element={<Main />} />} />
      </Routes>
    </Router>
  );
}

export default App;
