import firestore from '@react-native-firebase/firestore';
import {UserProps} from './user';

export const PAGE_SIZE = 3;

const postCollection = firestore().collection('posts');

export type PostProps = {
  id: string;
  user: UserProps | null;
  photoURL: string;
  description: string;
  createAt?: {
    seconds: number;
    nanoseconds: number;
  };
};
export function createPost({
  user,
  photoURL,
  description,
}: Pick<PostProps, 'user' | 'photoURL' | 'description'>) {
  return postCollection.add({
    user,
    photoURL,
    description,
    createAt: firestore.FieldValue.serverTimestamp(),
  });
}

export async function getPosts() {
  const snapshot = await postCollection
    .orderBy('createAt', 'desc')
    .limit(PAGE_SIZE)
    .get();
  const posts: PostProps[] = snapshot.docs.map(doc => ({
    id: doc.id,
    user: doc.data().user,
    photoURL: doc.data().photoURL,
    description: doc.data().description,
    createAt: doc.data().createAt,
  }));

  return posts;
}

export async function getOlderPosts(id: string) {
  const cursorDoc = await postCollection.doc(id).get();
  const snapshot = await postCollection
    .orderBy('createAt', 'desc')
    .startAfter(cursorDoc)
    .limit(PAGE_SIZE)
    .get();

  const posts: PostProps[] = snapshot.docs.map(doc => ({
    id: doc.id,
    user: doc.data().user,
    photoURL: doc.data().photoURL,
    description: doc.data().description,
    createAt: doc.data().createAt,
  }));

  return posts;
}

export async function getNewerPosts(id: string) {
  const cursorDoc = await postCollection.doc(id).get();
  const snapshot = await postCollection
    .orderBy('createAt', 'desc')
    .endBefore(cursorDoc)
    .limit(PAGE_SIZE)
    .get();

  const posts: PostProps[] = snapshot.docs.map(doc => ({
    id: doc.id,
    user: doc.data().user,
    photoURL: doc.data().photoURL,
    description: doc.data().description,
    createAt: doc.data().createAt,
  }));

  return posts;
}
