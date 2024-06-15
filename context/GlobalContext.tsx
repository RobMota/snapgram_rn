import { getCurrentUser } from "@/lib/appwrite/api";
import { IContextType } from "@/types";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isLoggedIn: false,
  setIsLoggedIn: () => {},
};

const GlobalContext = createContext<IContextType>(INITIAL_STATE);

const GlobalProvider = ({ children }: PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(INITIAL_USER);

  useEffect(() => {
    getCurrentUser()
      .then((response: any) => {
        if (response) {
          setUser(response);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          setUser(user);
        }
      })
      .catch((error: any) => {
        console.log("Error: ", error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, isLoading }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

export const useGlobalContext = () => useContext(GlobalContext);
