import React, {createContext, useState} from 'react';
import {v4 as uuidv4} from 'uuid';

export type LogsProps = {
  id: string;
  title: string;
  body: string;
  date: Date;
};

type ContextProps = {
  logs: LogsProps[];
  onCreate: ({id, title, body, date}: LogsProps) => void;
};

const LogContext = createContext<ContextProps>({
  logs: [],
  onCreate: () => {},
});

type Props = {
  children: React.ReactNode;
};
export function LogContextProvider({children}: Props) {
  const [logs, setLogs] = useState<LogsProps[]>(
    Array.from({length: 10})
      .map((_, index) => ({
        id: uuidv4(),
        title: `Log ${index}`,
        body: `Log ${index}`,
        date: new Date(),
      }))
      .reverse(),
  );

  const onCreate = ({id, title, body, date}: LogsProps) => {
    const log = {
      id,
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
