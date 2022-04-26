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
  onModify: ({id, title, body, date}: LogsProps) => void;
  onRemove: ({id}: Pick<LogsProps, 'id'>) => void;
};

const LogContext = createContext<ContextProps>({
  logs: [],
  onCreate: () => {},
  onModify: () => {},
  onRemove: () => {},
});

type Props = {
  children: React.ReactNode;
};
export function LogContextProvider({children}: Props) {
  const [logs, setLogs] = useState<LogsProps[]>(
    // initial data
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

  const onModify = ({id, title, body, date}: LogsProps) => {
    const modified = {
      id,
      title,
      body,
      date,
    };

    const nextLogs = logs.map(log => (log.id === id ? modified : log));

    setLogs(nextLogs);
  };

  const onRemove = ({id}: Pick<LogsProps, 'id'>) => {
    const nextLogs = logs.filter(log => log.id !== id);
    setLogs(nextLogs);
  };

  return (
    <LogContext.Provider value={{logs, onCreate, onModify, onRemove}}>
      {children}
    </LogContext.Provider>
  );
}

export default LogContext;
