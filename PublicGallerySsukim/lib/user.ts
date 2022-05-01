import firestore from '@react-native-firebase/firestore';

type UserProps = {
  id: string;
  displayName: string;
  photoURL: string | null;
};

export const userCollection = firestore().collection('users');

export function createUser({id, displayName, photoURL}: UserProps) {
  return userCollection.doc(id).set({
    id,
    displayName,
    photoURL,
  });
}

export async function getUser(id: string) {
  const doc = await userCollection.doc(id).get();
  return doc.data();
}
