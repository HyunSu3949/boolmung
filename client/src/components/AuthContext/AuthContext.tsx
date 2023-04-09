import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useContext,
} from "react";
import axiosInstance from "../../apis/utils/instance";

type Context = {
  isLogedIn: boolean | undefined;
  currentUser: object | undefined;
  handleLogout: () => void;
  setIsLogedIn: Dispatch<SetStateAction<boolean | undefined>>;
};
export const AuthContext: React.Context<Context> = createContext<Context>({
  isLogedIn: false,
  currentUser: {},
  handleLogout: () => undefined,
  setIsLogedIn: () => undefined,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogedIn, setIsLogedIn] = useState<boolean | undefined>(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  const handleLogout = () => {
    setIsLogedIn(false);
  };

  const checkLoginStatus = async () => {
    const response = await axiosInstance.get("/users/me");

    if (response.data.status === "success") {
      setCurrentUser(response.data.data);
      setIsLogedIn(true);
    } else {
      setCurrentUser(undefined);
      setIsLogedIn(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, [isLogedIn]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLogedIn,
        handleLogout,
        setIsLogedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
