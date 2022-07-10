import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Article} from '../api/type';
import ArticleItem from './ArticleItem';

export interface ArticleProps {
  articles: Article[];
}

function Articles({articles}: ArticleProps) {
  return (
    <FlatList
      data={articles}
      renderItem={({item}) => (
        <ArticleItem
          id={item.id}
          title={item.title}
          publishedAt={item.published_at}
          username={item.user.username}
        />
      )}
      keyExtractor={item => item.id.toString()}
      style={styles.list}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListFooterComponent={() =>
        articles.length > 0 ? <View style={styles.separator} /> : null
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#cfd8dc',
  },
});

export default Articles;
