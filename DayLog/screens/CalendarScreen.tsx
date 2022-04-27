import {format} from 'date-fns';
import React, {useContext, useMemo, useState} from 'react';
import CalendarView from '../components/CalendarView';
import FeedList from '../components/FeedList';
import LogContext from './contexts/LogContext';

type markDateProps = {
  [key: string]: {
    marked: boolean;
  };
};
function CalendarScreen() {
  const {logs} = useContext(LogContext);
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), 'yyyy-MM-dd'),
  );

  const markedDates = useMemo(
    () =>
      logs.reduce((acc: markDateProps, current) => {
        const formattedDate = format(new Date(current.date), 'yyyy-MM-dd');
        acc[formattedDate] = {marked: true};
        return acc;
      }, {}),
    [logs],
  );

  const filteredLogs = logs.filter(
    log => format(new Date(log.date), 'yyyy-MM-dd') === selectedDate,
  );
  return (
    <FeedList
      logs={filteredLogs}
      ListHeaderComponent={
        <CalendarView
          markedDates={markedDates}
          selectedDate={selectedDate}
          onSelectedDate={setSelectedDate}
        />
      }
    />
  );
}

export default CalendarScreen;
