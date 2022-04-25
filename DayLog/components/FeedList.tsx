import React from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';
import {LogsProps} from '../screens/contexts/LogContext';
import FeedListItem from './FeedListItem';

type Props = {
  logs: LogsProps[];
  onScrolledToBottom: (isBottom: boolean) => void;
};
function FeedList({logs, onScrolledToBottom}: Props) {
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!onScrolledToBottom) {
      return;
    }

    const {contentSize, layoutMeasurement, contentOffset} = e.nativeEvent;
    const distanceFromBottom =
      contentSize.height - layoutMeasurement.height - contentOffset.y;

    if (distanceFromBottom < 72) {
      onScrolledToBottom(true);
    } else {
      onScrolledToBottom(false);
    }
  };

  return (
    <FlatList
      data={logs}
      style={styles.block}
      renderItem={({item}) => (
        <FeedListItem
          id={item.id}
          title={item.title}
          body={item.body}
          date={item.date}
        />
      )}
      keyExtractor={log => log.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      onScroll={onScroll}
    />
  );
}

const styles = StyleSheet.create({
  block: {flex: 1},
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
    width: '100%',
  },
});

export default FeedList;
