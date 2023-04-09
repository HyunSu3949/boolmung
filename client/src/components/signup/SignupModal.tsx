import React, { useState } from "react";
import Modal from "react-modal";
import { SignupForm } from "./SignupForm";

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

export const SignupModal = ({ isOpen, closeModal }: propsType) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <h2>회원가입</h2>
        <SignupForm />
        <button onClick={closeModal}>취소</button>
      </Modal>
    </>
  );
};
