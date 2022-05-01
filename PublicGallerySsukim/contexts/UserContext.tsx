import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import React, {createContext, useContext, useState} from 'react';

type ContextProps = {
  user: FirebaseFirestoreTypes.DocumentData | null;
  setUser: React.Dispatch<
    React.SetStateAction<FirebaseFirestoreTypes.DocumentData | null>
  >;
};

const UserContext = createContext<ContextProps>({
  user: null,
  setUser: () => {},
});

type Props = {
  children: React.ReactNode;
};
export function UserContextProvider({children}: Props) {
  const [user, setUser] = useState<FirebaseFirestoreTypes.DocumentData | null>(
    null,
  );
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
