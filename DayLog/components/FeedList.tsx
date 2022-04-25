import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {LogsProps} from '../screens/contexts/LogContext';
import FeedListItem from './FeedListItem';

type Props = {
  logs: LogsProps[];
};
function FeedList({logs}: Props) {
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
