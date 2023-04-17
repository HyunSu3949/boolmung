import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../common/Context/AuthContext";
import { createRoom } from "../../../apis/room/createRoom";

type FormData = {
  title: string;
  max: number;
};
type PropsType = {
  closeModal: () => void;
};

export const ChatForm = ({ closeModal }: PropsType) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();

  const { currentUser } = useAuth();

  const onSubmit = async (data: FormData) => {
    try {
      const result = await createRoom({ ...data, owner: currentUser._id });
      console.log(result);
    } catch (error: any) {
      return;
    }
    closeModal();
  };

  return (
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
  );
};
