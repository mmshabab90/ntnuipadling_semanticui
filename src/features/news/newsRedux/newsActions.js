import { deleteNewsImageToFirebaseStorage } from "../../../app/api/firestore/firebaseService";
import {
  dataFromSnapshot,
  deleteNewsInFirestore,
  deletePhotoFromNewsCollection,
  fetchNewsFromFirestore,
} from "../../../app/api/firestore/firestoreService";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../app/async/asyncReducer";
import {
  CLEAR_NEWS,
  CLEAR_SELECTED_NEWS,
  CREATE_NEWS,
  DELETE_NEWS,
  FETCH_NEWS,
  LISTEN_TO_NEWS_PHOTOS,
  LISTEN_TO_SELECTED_NEWS,
  SET_DATE,
  SET_FILTER,
  UPDATE_NEWS,
} from "./newsConstants";

export function fetchNews(filter, date, limit, lastDocSnapshot) {
  return async function (dispatch) {
    dispatch(asyncActionStart());

    try {
      const snapshot = await fetchNewsFromFirestore(
        filter,
        date,
        limit,
        lastDocSnapshot
      ).get();
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      const moreNews = snapshot.docs.length >= limit;
      const news = snapshot.docs.map((doc) => dataFromSnapshot(doc));

      dispatch({
        type: FETCH_NEWS,
        payload: { news, moreNews, lastVisible },
      });

      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}

export function listenToNewsPhotos(photos) {
  return {
    type: LISTEN_TO_NEWS_PHOTOS,
    payload: photos,
  };
}

export function clearNews() {
  return {
    type: CLEAR_NEWS,
  };
}

export function setFilter(value) {
  return function (dispatch) {
    dispatch(clearNews());
    dispatch({ type: SET_FILTER, payload: value });
  };
}

export function setDate(date) {
  return function (dispatch) {
    dispatch(clearNews());
    dispatch({ type: SET_DATE, payload: date });
  };
}

export function createNews(news) {
  return {
    type: CREATE_NEWS,
    payload: news,
  };
}

export function updateNews(news) {
  return {
    type: UPDATE_NEWS,
    payload: news,
  };
}

export function deleteNews(newsId, photoName, photoId) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      if (photoId === undefined && photoName === undefined) {
        await dispatch(() => deleteNewsInFirestore(newsId));
      } else {
        await dispatch(() => deletePhotoFromNewsCollection(photoId, newsId));
        await dispatch(() =>
          deleteNewsImageToFirebaseStorage(photoName, newsId)
        );
        await dispatch(() => deleteNewsInFirestore(newsId));
      }
      dispatch({
        type: DELETE_NEWS,
        payload: newsId,
      });
      dispatch(asyncActionFinish());
      // dispatch(() => window.location.reload(false));
      dispatch(() => window.history.back());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}

export function listenToSelectedNews(news) {
  return {
    type: LISTEN_TO_SELECTED_NEWS,
    payload: news,
  };
}

export function clearSelectedNews() {
  return {
    type: CLEAR_SELECTED_NEWS,
  };
}
