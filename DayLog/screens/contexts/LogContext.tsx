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
  const [logs, setLogs] = useState<LogsProps[]>([
    {
      id: uuidv4(),
      title: 'Log 03',
      body: 'Log 03',
      date: new Date(),
    },
    {
      id: uuidv4(),
      title: 'Log 02',
      body: 'Log 02',
      date: new Date(Date.now() - 1000 * 60 * 3),
    },
    {
      id: uuidv4(),
      title: 'Log 01',
      body: 'Log 01',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    },
  ]);

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
