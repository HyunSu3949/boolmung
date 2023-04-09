import { useForm } from "react-hook-form";
import { signup } from "../../apis/user/signup";

type FormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export const useSignupForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await signup(data);
    } catch (error: any) {
      if (error.response.data.message.includes("E11000")) {
        setError("email", {
          type: "manual",
          message: "이미 사용중인 이메일 입니다.",
        });
      } else if (
        error.response.data.message.includes("User validation failed: password")
      ) {
        setError("password", {
          type: "manual",
          message: "8자리 이상 입력해주세요",
        });
      }

      return;
    }
  };

  const password = watch("password", "");

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    password,
  };
};
