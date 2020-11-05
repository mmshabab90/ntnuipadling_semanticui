import firebase from "../config/firebase";

export function signInWithEmail(creds) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(creds.email, creds.password);
}

export function signOutFirebase() {
  return firebase.auth().signOut();
}

export async function registerInFirebase(creds) {
  try {
    const results = await firebase
      .auth()
      .createUserWithEmailAndPassword(creds.email, creds.password);

    return await results.user.updateProfile({
      displayName: creds.displayName,
    });
  } catch (error) {
    throw error;
  }
}
