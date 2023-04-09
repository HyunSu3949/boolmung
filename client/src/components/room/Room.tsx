import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { sendChat } from "../../socket/socket";

export const Room: React.FC = () => {
  const [text, setText] = useState("");
  const { id = "" } = useParams();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendChat(id, text);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} type="text" />
        <button>보내기</button>
      </form>
    </>
  );
};
