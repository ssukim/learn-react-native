import React, {createContext, Dispatch, useState} from 'react';

type ContextProps = {
  text: string;
  setText: Dispatch<React.SetStateAction<string>>;
};
const LogContext = createContext<ContextProps>({
  text: '',
  setText: () => {},
});

type Props = {
  children: React.ReactNode;
};
export function LogContextProvider({children}: Props) {
  const [text, setText] = useState('');
  return (
    <LogContext.Provider value={{text, setText}}>
      {children}
    </LogContext.Provider>
  );
}

export default LogContext;
