import firestore from '@react-native-firebase/firestore';
import {UserProps} from './user';

export const PAGE_SIZE = 12;

const postCollection = firestore().collection('posts');

export type PostProps = {
  id: string;
  user: UserProps;
  photoURL: string;
  description: string;
  createdAt: {
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
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
}

export type getPostProps = {
  userId?: string;
  mode?: 'older' | 'newer';
  id?: string;
};
export async function getPosts({userId, mode = 'older', id}: getPostProps) {
  let query = postCollection.orderBy('createdAt', 'desc').limit(PAGE_SIZE);
  if (userId) {
    query = query.where('user.id', '==', userId);
  }

  if (id) {
    const cursorDoc = await postCollection.doc(id).get();
    query =
      mode === 'older'
        ? query.startAfter(cursorDoc)
        : query.endBefore(cursorDoc);
  }

  const snapshot = await query.get();
  const posts: PostProps[] = snapshot.docs.map(doc => ({
    id: doc.id,
    user: doc.data().user,
    photoURL: doc.data().photoURL,
    description: doc.data().description,
    createdAt: doc.data().createdAt,
  }));

  return posts;
}

export async function getOlderPosts(id: string, userId?: string) {
  return getPosts({
    id,
    mode: 'older',
    userId,
  });
}

export async function getNewerPosts(id: string, userId?: string) {
  return getPosts({
    id,
    mode: 'newer',
    userId,
  });
}

export function removePost(id: string) {
  return postCollection.doc(id).delete();
}

export type UpdatePostProps = {
  id: string;
  description: string;
};
export function updatePost({id, description}: UpdatePostProps) {
  return postCollection.doc(id).update({
    description,
  });
}
