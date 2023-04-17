import React, { useState } from "react";
import Modal from "react-modal";
import "./CreateChatModal.css";
import { useChatForm } from "./useChatForm";

type propsType = {
  isOpen: boolean;
  closeModal: () => void;
};

export const CreateChatModal = ({ isOpen, closeModal }: propsType) => {
  const { register, handleSubmit, errors, onSubmit } = useChatForm();

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        className="chatModal"
        overlayClassName="chatModal-overlay"
      >
        <h2>채팅방 생성</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="title">방 제목</label>
            <input
              id="title"
              type="text"
              {...register("title", { required: "방 제목을 입력해 주세요" })}
            />
            {errors.title && <p>{errors.title.message}</p>}
          </div>
          <div>
            <label htmlFor="max">참가인원</label>
            <input
              id="max"
              type="number"
              min={2}
              max={10}
              {...register("max", { required: "참가 인원을 입력해주세요" })}
            />
            {errors.max && <p>{errors.max.message}</p>}
          </div>
          <div>
            <button type="submit">개설하기</button>
            <button type="button" onClick={closeModal}>
              취소
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
