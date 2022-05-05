import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

const postCollection = firestore().collection('posts');

export function createPost({
  user,
  photoURL,
  description,
}: FirebaseFirestoreTypes.DocumentData) {
  return postCollection.add({
    user,
    photoURL,
    description,
    createAt: firestore.FieldValue.serverTimestamp(),
  });
}
