import { deleteInfoImageToFirebaseStorage } from "../../../app/api/firestore/firebaseService";
import {
  deleteInformationInFirestore,
  deletePhotoFromInformationCollection,
} from "../../../app/api/firestore/firestoreService";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../app/async/asyncReducer";
import {
  CLEAR_INFO,
  CLEAR_SELECTED_INFO,
  CREATE_INFO,
  DELETE_INFO,
  FETCH_INFO,
  LISTEN_TO_INFO_PHOTOS,
  LISTEN_TO_SELECTED_INFO,
  SET_DATE,
  SET_FILTER,
  UPDATE_INFO,
} from "./infoConstants";

export function listenToInformations(infos) {
  return {
    type: FETCH_INFO,
    payload: infos,
  };
}

export function listenToInfoPhotos(photos) {
  return {
    type: LISTEN_TO_INFO_PHOTOS,
    payload: photos,
  };
}

export function clearInfo() {
  return {
    type: CLEAR_INFO,
  };
}

export function setFilter(value) {
  return function (dispatch) {
    dispatch(clearInfo());
    dispatch({ type: SET_FILTER, payload: value });
  };
}

export function setDate(date) {
  return function (dispatch) {
    dispatch(clearInfo());
    dispatch({ type: SET_DATE, payload: date });
  };
}

export function createInfo(info) {
  return {
    type: CREATE_INFO,
    payload: info,
  };
}

export function updateInfo(info) {
  return {
    type: UPDATE_INFO,
    payload: info,
  };
}

export function deleteInfo(infoId, photoName, photoId) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      if (photoId === undefined && photoName === undefined) {
        await dispatch(() => deleteInformationInFirestore(infoId));
      } else {
        await dispatch(() =>
          deletePhotoFromInformationCollection(photoId, infoId)
        );
        await dispatch(() =>
          deleteInfoImageToFirebaseStorage(photoName, infoId)
        );
        await dispatch(() => deleteInformationInFirestore(infoId));
      }

      dispatch({
        type: DELETE_INFO,
        payload: infoId,
      });
      dispatch(asyncActionFinish());
      dispatch(() => window.history.back());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}

export function listenToInfo(info) {
  return {
    type: LISTEN_TO_SELECTED_INFO,
    payload: info,
  };
}

export function clearSelectedInfo() {
  return {
    type: CLEAR_SELECTED_INFO,
  };
}
