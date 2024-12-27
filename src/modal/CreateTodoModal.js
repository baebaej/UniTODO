import React, { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./CreateTodoModal.module.css";
import ModalButton from "../component/ModalButton";
import PriorityTag from "../component/PriorityTag";

import { useUserStore } from "../store/userStore";

// react-datepicker와 react-datepicker 스타일 추가
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Main({ onClose }) {
  const [selectedDate, setSelectedDate] = useState(null); // 날짜 상태
  const [selectedCategoryId, setSelectedCategoryId] = useState(""); // 카테고리 상태
  const [priority, setPriority] = useState(1); // 우선순위 상태
  const [calendarVisible, setCalendarVisible] = useState(false); // 캘린더 표시 여부
  const [categories, setCategories] = useState([]); // 카테고리 목록 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 오류 상태
  const [title, setTitle] = useState(""); // 제목 상태

  const { name, isNeedUpdate, setName, setIsNeedUpdate } = useUserStore();

  const token = JSON.parse(sessionStorage.getItem("user")).token; // 세션에서 토큰 가져오기

  // 카테고리 가져오기
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://na2ru2.me:5151/categories", {
          method: "GET",
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [token]);

  // 날짜 변경 처리
  const handleDateChange = (date) => {
    setSelectedDate(date); // 수정된 날짜 저장

    setCalendarVisible(false); // 날짜 선택 후 캘린더 숨기기
  };

  // 카테고리 변경 처리
  const handleCategoryChange = (event) => {
    setSelectedCategoryId(event.target.value);
  };

  // 우선순위 변경 처리
  const handlePriorityChange = (event) => {
    setPriority(Number(event.target.value)); // 우선순위 상태 업데이트
  };

  // 캘린더 표시/숨기기
  const toggleCalendar = () => {
    setCalendarVisible((prev) => !prev); // 캘린더 표시 토글
  };

  // 제목 입력 처리
  const handleTitleChange = (event) => {
    setTitle(event.target.value); // 제목 상태 업데이트
  };

  // 추가 버튼 클릭 시 처리
  const handleAddClick = async () => {
    if (title === "" || selectedDate === null || selectedCategoryId === "") {
      alert("입력칸을 모두 채워주세요.");
      return;
    }

    const description = null;
    // getTimezoneOffset()은 현재 시간과의 차이를 분 단위로 반환한다.
    const offset = selectedDate.getTimezoneOffset() * 60000;

    const krdate = new Date(selectedDate - offset);

    const dueDate = krdate;

    const requestBody = {
      title,
      description,
      dueDate,
      categoryId: selectedCategoryId,
      priority: priority === 1 ? "BOTTOM" : priority === 2 ? "MIDDLE" : "TOP", // 우선순위 값 설정
      status: "PENDING", // 상태는 PENDING으로 설정
    };

    try {
      const response = await fetch("http://na2ru2.me:5151/tasks", {
        method: "POST",
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        alert("할 일을 추가했어요.");
        setIsNeedUpdate(!isNeedUpdate);

        onClose(); // 모달 닫기
      } else {
        throw new Error("추가 실패");
      }
    } catch (err) {
      alert(err.message || "추가 실패");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles["main-container"]}>
        <span className={styles["todo-creation"]}>TODO 만들기</span>
        <div className={styles["frame-1"]}>
          <div className={styles["frame-2"]}>
            <div className={styles["frame-3"]}>
              <span className={styles["to-do"]}>할 일</span>
              <div className={styles["frame-4"]}>
                <div className={styles["frame-5"]}>
                  <input
                    className={classNames(
                      styles["frame-input"],
                      styles["span-category-name"]
                    )}
                    placeholder="제목을 입력하세요"
                    value={title} // 제목 상태 값 연결
                    onChange={handleTitleChange} // 제목 입력 처리
                  />
                </div>
                <div className={styles["frame-6"]}>
                  <div
                    className={styles["date-picker"]}
                    onClick={toggleCalendar} // 입력창 클릭 시 캘린더 열기
                  >
                    <input
                      type="text"
                      className={classNames(
                        styles["frame-input"],
                        styles["span-category-name"]
                      )}
                      placeholder="날짜를 선택하세요"
                      value={
                        selectedDate ? selectedDate.toLocaleDateString() : ""
                      }
                      readOnly
                    />
                  </div>
                </div>
                {calendarVisible && (
                  <div className={styles["calendar-container"]}>
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleDateChange}
                      dateFormat="yyyy년 MM월 dd일"
                      inline
                      popperPlacement="top" // 캘린더 위치를 상단으로 설정
                      showTimeSelect={false} // 시간 선택 비활성화
                      popperModifiers={{
                        offset: {
                          enabled: true,
                          offset: "0, 10px", // 캘린더와 입력창 사이의 간격 조정
                        },
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className={styles["frame-9"]}>
              <span className={styles["span-category"]}>카테고리</span>
              <div className={styles["frame-a"]}>
                <select
                  className={styles["category-select"]}
                  value={selectedCategoryId} // 카테고리 상태 값 연결
                  onChange={handleCategoryChange}
                >
                  <option value="">선택하세요</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category.categoryId}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={styles["frame-c"]}>
              <span className={styles["priority"]}>우선순위</span>
              <div className={styles["frame-d"]}>
                {/* 우선순위를 라디오 버튼 그룹으로 변경 */}
                <label>
                  <input
                    type="radio"
                    name="priority"
                    value={1}
                    checked={priority === 1}
                    onChange={handlePriorityChange}
                  />
                  <PriorityTag priority={1} />
                </label>
                <label>
                  <input
                    type="radio"
                    name="priority"
                    value={2}
                    checked={priority === 2}
                    onChange={handlePriorityChange}
                  />
                  <PriorityTag priority={2} />
                </label>
                <label>
                  <input
                    type="radio"
                    name="priority"
                    value={3}
                    checked={priority === 3}
                    onChange={handlePriorityChange}
                  />
                  <PriorityTag priority={3} />
                </label>
              </div>
            </div>
          </div>
          <div className={styles["frame-10"]}>
            <span onClick={onClose}>
              <ModalButton
                onClick={onClose}
                type={1}
                label="취소"
              ></ModalButton>
            </span>
            <span onClick={handleAddClick}>
              <ModalButton type={2} label="추가"></ModalButton>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
