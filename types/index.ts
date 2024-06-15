export type IUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
};

export type IContextType = {
  user: IUser;
  isLoading: boolean;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export type FormData = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export type ValidFieldNames = "name" | "username" | "email" | "password";
