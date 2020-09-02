import { auth } from "../components/Firebase/firebase";

export function signup(email, password) {
  return auth().createUserWithEmailAndPassword(email, password);
}

export function signin(email, password) {
  return auth().signInWithEmailAndPassword(email, password);
}


export function signInWithGitHub(email, password) {
  return auth().signInWithEmailAndPassword(email, password);
}


export function signInWithGoogle(email, password) {
  return auth().signInWithEmailAndPassword(email, password);
}

export function logout() {
  return auth().signOut();
}

export function profile(email, password)
{

  return  auth().signInWithEmailAndPassword(email, password);
}