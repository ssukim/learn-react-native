import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {useQuery} from 'react-query';
import {getArticles} from '../api/articles';
import {Article} from '../api/type';
import Articles from '../components/Articles';

function ArticlesScreen() {
  const {data, isLoading} = useQuery('articles', getArticles);

  if (!data) {
    return <ActivityIndicator size="large" style={styles.spinner} />;
  }
  return <Articles articles={data} />;
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
  },
});
export default ArticlesScreen;
