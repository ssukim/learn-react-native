import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

export type UserProps = {
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
  try {
    const doc: FirebaseFirestoreTypes.DocumentData = await userCollection
      .doc(id)
      .get();

    const res: UserProps = {
      id: doc.data().id,
      displayName: doc.data().displayName,
      photoURL: doc.data().photoURL,
    };

    return res;
  } catch (error) {
    console.log(error);
  }
}
