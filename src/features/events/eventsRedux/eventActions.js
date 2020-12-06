import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "./../../../app/async/asyncReducer";
import {
  dataFromSnapshot,
  deleteEventInFirestore,
  fetchEventsFromFirestore,
} from "../../../app/api/firestore/firestoreService";

import {
  CREATE_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT,
  FETCH_EVENTS,
  LISTEN_TO_EVENT_CHAT,
  LISTEN_TO_SELECTED_EVENT,
  CLEAR_EVENTS,
  SET_FILTER,
  SET_START_DATE_TIME,
  CLEAR_SELECTED_EVENT,
} from "./eventConstants";

export function fetchEvents(filter, startDateTime, limit, lastDocSnapshot) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const snapshot = await fetchEventsFromFirestore(
        filter,
        startDateTime,
        limit,
        lastDocSnapshot
      ).get();
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      const moreEvents = snapshot.docs.length >= limit;
      const events = snapshot.docs.map((doc) => dataFromSnapshot(doc));
      dispatch({
        type: FETCH_EVENTS,
        payload: { events, moreEvents, lastVisible },
      });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}

export function setFilter(value) {
  return function (dispatch) {
    dispatch(clearEvents());
    dispatch({ type: SET_FILTER, payload: value });
  };
}

export function setStartDateTime(date) {
  return function (dispatch) {
    dispatch(clearEvents());
    dispatch({ type: SET_START_DATE_TIME, payload: date });
  };
}

export function createEvent(event) {
  return {
    type: CREATE_EVENT,
    payload: event,
  };
}

export function updateEvent(event) {
  return {
    type: UPDATE_EVENT,
    payload: event,
  };
}

export function deleteEvent(eventId) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      await dispatch(() => deleteEventInFirestore(eventId));
      dispatch({
        type: DELETE_EVENT,
        payload: eventId,
      });
      dispatch(asyncActionFinish());
      dispatch(() => window.location.reload(false));
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}

export function listenToSelectedEvent(event) {
  return {
    type: LISTEN_TO_SELECTED_EVENT,
    payload: event,
  };
}

export function clearSelectedEvent() {
  return {
    type: CLEAR_SELECTED_EVENT,
  };
}

export function listenToEventChat(comments) {
  return {
    type: LISTEN_TO_EVENT_CHAT,
    payload: comments,
  };
}

export function clearEvents() {
  return {
    type: CLEAR_EVENTS,
  };
}
