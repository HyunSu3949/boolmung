import { useForm } from "react-hook-form";
import { useAuth } from "../../common/Context/AuthContext";
import { createRoom } from "../../../apis/room/createRoom";

type FormData = {
  title: string;
  max: number;
};

export const useChatForm = () => {
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
    } catch (error: any) {}
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};
