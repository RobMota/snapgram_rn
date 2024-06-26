import { getCurrentUser } from "@/lib/appwrite/api";
import { IContextType, IUser } from "@/types";
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
  setIsLoggedIn: () => false as boolean,
  setIsLoading: () => true as boolean,
  setUser: () => {},
};

const GlobalContext = createContext<IContextType>(INITIAL_STATE);

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    
    getCurrentUser()
      .then((currentAccount) => {
        if (currentAccount) {
          setUser({
            id: currentAccount.$id,
            name: currentAccount.name,
            username: currentAccount.username,
            email: currentAccount.email,
            imageUrl: currentAccount.imageUrl,
            bio: currentAccount.bio,
          });
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          setUser(undefined);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    user,
    isLoading,
    setIsLoading,
    setUser,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalProvider;
