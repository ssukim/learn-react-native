import React, {createContext, useState} from 'react';
import {v4 as uuidv4} from 'uuid';

type LogsProps = {
  id?: string;
  title: string;
  body: string;
  date: string;
};

type ContextProps = {
  logs: LogsProps[];
  onCreate: ({title, body, date}: LogsProps) => void;
};

const LogContext = createContext<ContextProps>({
  logs: [],
  onCreate: () => {},
});

type Props = {
  children: React.ReactNode;
};
export function LogContextProvider({children}: Props) {
  const [logs, setLogs] = useState<LogsProps[]>([]);

  const onCreate = ({title, body, date}: LogsProps) => {
    const id = uuidv4();

    const log = {
      id: id,
      title,
      body,
      date,
    };

    setLogs([log, ...logs]);
  };

  return (
    <LogContext.Provider value={{logs, onCreate}}>
      {children}
    </LogContext.Provider>
  );
}

export default LogContext;
