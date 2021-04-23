import { deleteBoardMemberImageToFirebaseStorage } from "../../../app/api/firestore/firebaseService";
import {
  dataFromSnapshot,
  deleteMemberInFirestore,
  deletePhotoFromBoardMemberCollection,
  getBoardMembersFromFirestore,
} from "../../../app/api/firestore/firestoreService";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../app/async/asyncReducer";
import {
  CLEAR_BOARD_MEMBERS,
  CLEAR_SELECTED_BOARD_MEMBER,
  CREATE_BOARD_MEMBER,
  DELETE_BOARD_MEMBER,
  FETCH_BOARD_MEMBERS,
  LISTEN_TO_BOARD_MEMBER_PHOTOS,
  LISTEN_TO_SELECTED_BOARD_MEMBERS,
  SET_DATE,
  SET_FILTER,
  UPDATE_BOARD_MEMBER,
} from "./boardMembersConstants";

export function listenToBoardMembers(members) {
  return {
    type: FETCH_BOARD_MEMBERS,
    payload: members,
  };
}

export function listenToBoardMemberPhotos(photos) {
  return {
    type: LISTEN_TO_BOARD_MEMBER_PHOTOS,
    payload: photos,
  };
}

export function clearBoardMembers() {
  return {
    type: CLEAR_BOARD_MEMBERS,
  };
}

export function setFilter(value) {
  return function (dispatch) {
    dispatch(clearBoardMembers());
    dispatch({ type: SET_FILTER, payload: value });
  };
}

export function setDate(date) {
  return function (dispatch) {
    dispatch(clearBoardMembers());
    dispatch({ type: SET_DATE, payload: date });
  };
}

export function createBoardMember(members) {
  return {
    type: CREATE_BOARD_MEMBER,
    payload: members,
  };
}

export function updateBoardMember(members) {
  return {
    type: UPDATE_BOARD_MEMBER,
    payload: members,
  };
}

export function deleteBoardMember(memberId, photoName, photoId) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      // await dispatch(() =>
      //   deletePhotoFromBoardMemberCollection(photoId, memberId)
      // );
      // await dispatch(() =>
      //   deleteBoardMemberImageToFirebaseStorage(photoName, memberId)
      // );
      await dispatch(() => deleteMemberInFirestore(memberId));
      dispatch({
        type: DELETE_BOARD_MEMBER,
        payload: memberId,
      });
      dispatch(asyncActionFinish());
      // dispatch(() => window.location.reload(false));
      // dispatch(() => window.history.back());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}

export function listenToSelectedBoardMember(members) {
  return {
    type: LISTEN_TO_SELECTED_BOARD_MEMBERS,
    payload: members,
  };
}

export function clearSelectedBoardMember() {
  return {
    type: CLEAR_SELECTED_BOARD_MEMBER,
  };
}
