import React, {createContext, useContext, useState} from 'react';
import {User} from '../api/type';

type UserContextState = [User | null, (user: User | null) => void];

const UserContext = createContext<UserContextState | null>(null);

export function UserContextProvider({children}: {children: React.ReactNode}) {
  const userState = useState<User | null>(null);

  return (
    <UserContext.Provider value={userState}>{children}</UserContext.Provider>
  );
}

//Context를 추후 더 편하게 사용할 수 있도록 만든 Hook
export function useUserState() {
  const userState = useContext(UserContext);
  if (!userState) {
    throw new Error('UserContext is not used');
  }
  return userState;
}
