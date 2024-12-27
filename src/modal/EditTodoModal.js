import React, { useEffect, useState } from "react";
import { useUserStore } from "../store/userStore";

import classNames from "classnames";
import styles from "./CreateTodoModal.module.css";
import ModalButton from "../component/ModalButton";
import PriorityTag from "../component/PriorityTag";
import StatusTag from "../component/StatusTag";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Main({ onClose, TaskId, openModal, setModalNumber }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [taskData, setTaskData] = useState(null);
  const [priority, setPriority] = useState(1);
  const [status, setStatus] = useState(1);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");

  const { name, isNeedUpdate, setName, setIsNeedUpdate } = useUserStore();

  const token = JSON.parse(sessionStorage.getItem("user")).token;

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
        setTaskData(data);
        setTitle(data.title);
        setSelectedCategoryId(data.categoryDto.id);
        setPriority(
          data.priority === "BOTTOM" ? 1 : data.priority === "MIDDLE" ? 2 : 3
        );
        setStatus(
          data.status === "PENDING" ? 1 : data.status === "PROGRESS" ? 2 : 3
        );
        setSelectedDate(new Date(data.dueDate));
      } catch (error) {
        console.error("There was an error fetching the task data:", error);
      }
    };

    fetchCategories();
    fetchTaskData();
  }, [TaskId, token]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setCalendarVisible(false);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategoryId(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setPriority(Number(event.target.value));
  };

  const handleStatusChange = (event) => {
    setStatus(Number(event.target.value));
  };

  const toggleCalendar = () => {
    setCalendarVisible((prev) => !prev);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSaveBtnClick = async () => {
    // getTimezoneOffset()은 현재 시간과의 차이를 분 단위로 반환한다.
    const offset = selectedDate.getTimezoneOffset() * 60000;

    const krdate = new Date(selectedDate - offset);

    const dueDate = krdate;
    try {
      const response = await fetch(`http://na2ru2.me:5151/tasks/${TaskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description: taskData?.description || "", // 기본값 설정
          dueDate: dueDate,
          categoryId: Number(selectedCategoryId),
          priority:
            priority === 1 ? "BOTTOM" : priority === 2 ? "MIDDLE" : "TOP",
          status:
            status === 1 ? "PENDING" : status === 2 ? "PROGRESS" : "COMPLETED",
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert("수정이 완료되었습니다.");
      setIsNeedUpdate(!isNeedUpdate);

      onClose();
    } catch (error) {
      console.error("Error saving task:", error);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles["main-container"]}>
        <span className={styles["todo-creation"]}>TODO 수정</span>
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
                    value={title}
                    onChange={handleTitleChange}
                  />
                </div>
                <div className={styles["frame-6"]}>
                  <div
                    className={styles["date-picker"]}
                    onClick={toggleCalendar}
                  >
                    <input
                      type="text"
                      className={styles["frame-input-7"]}
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
                  value={selectedCategoryId}
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
            <div className={styles["frame-c"]}>
              <span className={styles["priority"]}>진행상태</span>
              <div className={styles["frame-d"]}>
                <label>
                  <input
                    type="radio"
                    name="status"
                    value={1}
                    checked={status === 1}
                    onChange={handleStatusChange}
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
                  />
                  <StatusTag status={3} />
                </label>
              </div>
            </div>
          </div>
          <div className={styles["frame-10"]}>
            <span onClick={onClose}>
              <ModalButton type={1} label="취소"></ModalButton>
            </span>
            <span onClick={handleSaveBtnClick}>
              <ModalButton type={2} label="저장"></ModalButton>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
