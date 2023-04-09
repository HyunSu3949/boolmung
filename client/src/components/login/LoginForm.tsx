import React from "react";
import { useLoginForm } from "./useLoginForm";

export const LoginForm: React.FC = () => {
  const { register, handleSubmit, errors, onSubmit } = useLoginForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "이메일을 입력해주세요",
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          {...register("password", {
            required: "비밀번호를 입력해주세요",
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      {errors.root && <p>{errors.root.message}</p>}
      <button type="submit">Submit</button>
    </form>
  );
};
