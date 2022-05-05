import React, {createContext, useContext, useState} from 'react';
import {UserProps} from '../lib/user';

type ContextProps = {
  user: UserProps | null;
  setUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
};

const UserContext = createContext<ContextProps>({
  user: null,
  setUser: () => {},
});

type Props = {
  children: React.ReactNode;
};
export function UserContextProvider({children}: Props) {
  const [user, setUser] = useState<UserProps | null>(null);
  return (
    <UserContext.Provider
      children={children}
      value={{
        user,
        setUser,
      }}
    />
  );
}

export function useUserContext() {
  const userContext = useContext(UserContext);
  if (!useContext) {
    throw new Error('UserContext.Provider is not found');
  }
  return userContext;
}
