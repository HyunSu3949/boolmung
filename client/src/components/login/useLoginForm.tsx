import { useForm } from "react-hook-form";
import { login } from "./../../apis/user/login";

type FormData = {
  email: string;
  password: string;
};

export const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await login(data);
    } catch (error: any) {
      if (
        error.response.data.message.includes(
          "이메일 또는 비밀번호가 일치하지 않습니다"
        )
      ) {
        setError("root", {
          type: "manual",
          message: "이메일 또는 비밀번호가 일치하지 않습니다",
        });
      }

      return;
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};
