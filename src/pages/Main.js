import React, { useEffect, useState } from "react";
import { useUserStore } from "../store/userStore";

import styles from "./Main.module.css"; // CSS 모듈로 변경
import Header from "../component/Header";
import AddMenu from "../component/AddMenu";
import TodoList from "../component/TodoList";
import Bottom from "../component/Bottom";

import CategoryAddModal from "../modal/CategoryAddModal";
import CreateTodoModal from "../modal/CreateTodoModal";
import LookupCategoryModal from "../modal/LookupCategoryModal";
import LookupTodoModal from "../modal/LookupTodoModal";
import MyInfoModal from "../modal/MyInfoModal";
import MyInfoEditModal from "../modal/MyInfoEditModal";
import EditCategoryModal from "../modal/EditCategoryModal";
import EditTodoModal from "../modal/EditTodoModal";

function Main() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ModalNumber, setModalNumber] = useState(1);
  const [CategoryId, setCategoryId] = useState(1);
  const [TaskId, setTaskId] = useState(1);

  // const name = useUserStore((state) => state.name); // name 가져오기

  // if (name === "") {
  //   window.location.href = "/";
  // }

  // 모달 열기 함수
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.Main}>
      <div className={styles.HeaderFrame}>
        <Header
          openModal={openModal}
          onClose={closeModal}
          setModalNumber={setModalNumber}
        />
      </div>
      <div className={styles.ContentFrame}>
        {isModalOpen && ModalNumber === 1 && (
          <CategoryAddModal onClose={closeModal} />
        )}
        {isModalOpen && ModalNumber === 2 && (
          <CreateTodoModal onClose={closeModal} />
        )}
        {isModalOpen && ModalNumber === 3 && (
          <LookupCategoryModal
            onClose={closeModal}
            categoryId={CategoryId}
            openModal={openModal}
            setModalNumber={setModalNumber}
          />
        )}
        {isModalOpen && ModalNumber === 4 && (
          <LookupTodoModal
            onClose={closeModal}
            TaskId={TaskId}
            openModal={openModal}
            setModalNumber={setModalNumber}
          />
        )}
        {isModalOpen && ModalNumber === 5 && (
          <MyInfoModal
            onClose={closeModal}
            openModal={openModal}
            setModalNumber={setModalNumber}
          />
        )}
        {isModalOpen && ModalNumber === 6 && (
          <MyInfoEditModal
            onClose={closeModal}
            openModal={openModal}
            setModalNumber={setModalNumber}
          />
        )}
        {isModalOpen && ModalNumber === 7 && (
          <EditCategoryModal
            onClose={closeModal}
            categoryId={CategoryId}
            openModal={openModal}
            setModalNumber={setModalNumber}
          />
        )}
        {isModalOpen && ModalNumber === 8 && (
          <EditTodoModal
            onClose={closeModal}
            TaskId={TaskId}
            openModal={openModal}
            setModalNumber={setModalNumber}
          />
        )}

        <div className={styles.LeftComponent}>
          <AddMenu openModal={openModal} setModalNumber={setModalNumber} />
        </div>
        <div className={styles.RightComponent}>
          <TodoList
            openModal={openModal}
            closeModal={closeModal}
            setModalNumber={setModalNumber}
            setcategoryId={setCategoryId}
            setTaskId={setTaskId}
          />
        </div>
      </div>
      <div className={styles.BottomFrame}>
        <Bottom />
      </div>
    </div>
  );
}

export default Main;
