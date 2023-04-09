import React from "react";
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export const SignupForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = (data: FormData) => {};

  const password = watch("password", "");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          {...register("name", {
            required: "이름을 입력해주세요",
            validate: (value: string) =>
              value.length > 1 || "2자 이상 입력해주세요",
          })}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "이메일을 입력해주세요",
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i,
              message: "Invalid email address",
            },
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
            minLength: {
              value: 6,
              message: "6자리 이상 입력해주세요",
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <label htmlFor="passwordConfirm">Password Confirm:</label>
        <input
          id="passwordConfirm"
          type="password"
          {...register("passwordConfirm", {
            required: "비밀번호 확인을 입력해주세요",
            validate: (value: string) =>
              value === password || "비밀번호가 일치하지 않습니다",
          })}
        />
        {errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
