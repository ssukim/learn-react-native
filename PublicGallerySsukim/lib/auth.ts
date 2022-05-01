import auth from '@react-native-firebase/auth';

type SignProps = {
  email: string;
  password: string;
};

export function signIn({email, password}: SignProps) {
  return auth().signInWithEmailAndPassword(email, password);
}

export function signUp({email, password}: SignProps) {
  return auth().createUserWithEmailAndPassword(email, password);
}

export function subscribeAuth(callback: any) {
  return auth().onAuthStateChanged(callback);
}

export function signOut() {
  return auth().signOut();
}
