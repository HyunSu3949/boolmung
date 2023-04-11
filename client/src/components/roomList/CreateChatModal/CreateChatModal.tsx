import React, { useState } from "react";
import Modal from "react-modal";
import ChatForm from "./ChatForm";

type propsType = {
  isOpen: boolean;
  closeModal: () => void;
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const CreateChatModal = ({ isOpen, closeModal }: propsType) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <h2>채팅방 생성</h2>
        <ChatForm />
        <button type="button" onClick={closeModal}>
          취소
        </button>
      </Modal>
    </>
  );
};
