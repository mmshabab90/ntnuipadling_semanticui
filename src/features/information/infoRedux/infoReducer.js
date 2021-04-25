import {
  CLEAR_INFO,
  CLEAR_SELECTED_INFO,
  CREATE_INFO,
  DELETE_INFO,
  FETCH_INFO,
  LISTEN_TO_INFO_PHOTOS,
  LISTEN_TO_SELECTED_INFO,
  RETAIN_STATE,
  SET_DATE,
  SET_FILTER,
  UPDATE_INFO,
} from "./infoConstants";

const initialState = {
  infos: [],
  moreInfo: true,
  selectedInfo: null,
  lastVisible: null,
  filter: "all",
  date: new Date("01/01/1990"),
  retainState: false,
  photos: [],
};

export default function infoReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CREATE_INFO:
      return {
        ...state,
        infos: [...state.infos, payload],
      };
    case UPDATE_INFO:
      return {
        ...state,
        infos: [
          ...state.infos.filter((info) => info.id !== payload.id),
          payload,
        ],
      };
    case DELETE_INFO:
      return {
        ...state,
        infos: [...state.infos.filter((info) => info.id !== payload)],
      };
    case FETCH_INFO:
      return {
        ...state,
        infos: payload,
        moreInfo: payload.moreInfo,
        lastVisible: payload.lastVisible,
      };
    case LISTEN_TO_SELECTED_INFO:
      return {
        ...state,
        selectedInfo: payload,
      };
    case CLEAR_INFO:
      return {
        ...state,
        infos: [],
        moreInfo: true,
        lastVisible: null,
      };
    case CLEAR_SELECTED_INFO:
      return {
        ...state,
        selectedInfo: null,
      };
    case SET_FILTER:
      return {
        ...state,
        retainState: false,
        moreInfo: true,
        filter: payload,
      };
    case SET_DATE:
      return {
        ...state,
        retainState: false,
        moreInfo: true,
        date: payload,
      };
    case RETAIN_STATE:
      return {
        ...state,
        retainState: true,
      };
    case LISTEN_TO_INFO_PHOTOS:
      return {
        ...state,
        photos: payload,
      };

    default:
      return state;
  }
}
