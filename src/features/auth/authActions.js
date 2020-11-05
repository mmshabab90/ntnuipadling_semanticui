import { SIGN_IN_USER, SIGN_OUT_USER } from "./authConstants";
import firebase from "./../../app/api/config/firebase";

export function signInUser(user) {
  return {
    type: SIGN_IN_USER,
    payload: user,
  };
}

// observe sign in and out state of firebase user
export function verifyAuth() {
  return function (dispatch) {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(signInUser(user));
      } else {
        dispatch(signOutUser());
      }
    });
  };
}

export function signOutUser() {
  return {
    type: SIGN_OUT_USER,
  };
}
