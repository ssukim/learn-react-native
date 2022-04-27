import React from 'react';
import {Calendar} from 'react-native-calendars';
import {StyleSheet} from 'react-native';

type Props = {
  markedDates: {
    [key: string]: {
      marked: boolean;
    };
  };
  selectedDate: string;
  onSelectedDate: React.Dispatch<React.SetStateAction<string>>;
};
function CalendarView({markedDates, selectedDate, onSelectedDate}: Props) {
  const markedSelectedDate = {
    ...markedDates,
    [selectedDate]: {
      selected: true,
      marked: markedDates[selectedDate]?.marked,
    },
  };
  return (
    <Calendar
      style={styles.calendar}
      markedDates={markedSelectedDate}
      theme={{
        selectedDayBackgroundColor: '#009688',
        arrowColor: '#009688',
        dotColor: '#009688',
        todayTextColor: '#009688',
      }}
      onDayPress={day => {
        onSelectedDate(day.dateString);
      }}
    />
  );
}

const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
});

export default CalendarView;
