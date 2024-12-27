import React, { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./CreateTodoModal.module.css";
import ModalButton from "../component/ModalButton";
import PriorityTag from "../component/PriorityTag";
import StatusTag from "../component/StatusTag";
import { useUserStore } from "../store/userStore";

import { ReactComponent as CloseBtn } from "../img/material-symbols_close-rounded.svg";

// react-datepicker와 react-datepicker 스타일 추가
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Main({ onClose, TaskId, openModal, setModalNumber }) {
  const [selectedDate, setSelectedDate] = useState(null); // 날짜 상태
  const [selectedCategoryId, setSelectedCategoryId] = useState(""); // 카테고리 상태
  const [taskData, setTaskData] = useState(null); // task 상태

  const [priority, setPriority] = useState(1); // 우선순위 상태
  const [status, setStatus] = useState(1); // 진행상황 상태
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

    const fetchTaskData = async () => {
      try {
        const response = await fetch(`http://na2ru2.me:5151/tasks/${TaskId}`, {
          method: "GET",
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTaskData(data); // 받아온 데이터 상태에 저장
        setTitle(data.title); // 제목 설정
        setSelectedCategoryId(data.categoryDto.id); // 카테고리 설정
        setPriority(
          data.priority === "BOTTOM" ? 1 : data.priority === "MIDDLE" ? 2 : 3
        ); // 우선순위 설정
        setStatus(
          data.status === "PENDING" ? 1 : data.status === "PROGRESS" ? 2 : 3
        );
        setSelectedDate(new Date(data.dueDate)); // 날짜 설정
      } catch (error) {
        console.error("There was an error fetching the task data:", error);
      }
    };

    fetchCategories();
    fetchTaskData();
  }, [TaskId, token]);

  // 날짜 변경 처리
  const handleDateChange = (date) => {
    setSelectedDate(date);
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

  // 진행상태 변경 처리
  const handleStatusChange = (event) => {
    setStatus(Number(event.target.value)); // 우선순위 상태 업데이트
  };

  // 캘린더 표시/숨기기
  const toggleCalendar = () => {
    setCalendarVisible((prev) => !prev); // 캘린더 표시 토글
  };

  // 제목 입력 처리
  const handleTitleChange = (event) => {
    setTitle(event.target.value); // 제목 상태 업데이트
  };

  const handleEditbtnClick = () => {
    setModalNumber(8);
    openModal();
  };

  const handleDeleteBtnClick = async (event) => {
    event.stopPropagation(); // 이벤트 전파 중단 (다른 onclick이 실행되는 것을 막음)

    if (window.confirm("정말로 삭제하시겠어요?")) {
      try {
        const response = await fetch(`/tasks/${TaskId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 204) {
          alert("할 일이 성공적으로 삭제되었어요.");
          setIsNeedUpdate(!isNeedUpdate);
          onClose();
        } else {
          alert("카테고리 삭제에 실패했어요.");
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
        <span className={styles["todo-creation"]}>TODO 조회</span>
        <span onClick={onClose} className={styles["close-button"]}>
          <CloseBtn />
        </span>
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
                    readOnly
                  />
                </div>
                <div className={styles["frame-6"]}>
                  <div className={styles["date-picker"]}>
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
                  disabled // 사용자가 변경하지 못하도록 설정
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
                    disabled // 사용자가 변경하지 못하도록 설정
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
                    disabled // 사용자가 변경하지 못하도록 설정
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
                    disabled // 사용자가 변경하지 못하도록 설정
                  />
                  <PriorityTag priority={3} />
                </label>
              </div>
            </div>
            <div className={styles["frame-c"]}>
              <span className={styles["priority"]}>진행상태</span>
              <div className={styles["frame-d"]}>
                {/* 우선순위를 라디오 버튼 그룹으로 변경 */}
                <label>
                  <input
                    type="radio"
                    name="status"
                    value={1}
                    checked={status === 1}
                    onChange={handleStatusChange}
                    disabled // 사용자가 변경하지 못하도록 설정
                  />
                  <StatusTag status={1} />
                </label>
                <label>
                  <input
                    type="radio"
                    name="status"
                    value={2}
                    checked={status === 2}
                    onChange={handleStatusChange}
                    disabled // 사용자가 변경하지 못하도록 설정
                  />
                  <StatusTag status={2} />
                </label>
                <label>
                  <input
                    type="radio"
                    name="status"
                    value={3}
                    checked={status === 3}
                    onChange={handleStatusChange}
                    disabled // 사용자가 변경하지 못하도록 설정
                  />
                  <StatusTag status={3} />
                </label>
              </div>
            </div>
          </div>
          <div className={styles["frame-10"]}>
            <span onClick={handleEditbtnClick}>
              <ModalButton type={1} label="수정"></ModalButton>
            </span>
            <span onClick={handleDeleteBtnClick}>
              <ModalButton type={3} label="삭제"></ModalButton>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
