import React from "react";
import { useChatForm } from "./useChatForm";

function ChatForm() {
  const { register, handleSubmit, errors, onSubmit } = useChatForm();

  return (
    <div>
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

        <button type="submit">개설하기</button>
      </form>
    </div>
  );
}

export default ChatForm;
