import {
  CLEAR_NEWS,
  CREATE_NEWS,
  DELETE_NEWS,
  FETCH_NEWS,
  LISTEN_TO_SELECTED_NEWS,
  RETAIN_STATE,
  SET_DATE,
  SET_FILTER,
  UPDATE_NEWS,
} from "./newsConstants";

const initialState = {
  news: [],
  moreNews: true,
  selectedNews: null,
  lastVisible: null,
  filter: "all",
  date: new Date("01/01/2020"),
  retainState: false,
};

export default function newsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CREATE_NEWS:
      return {
        ...state,
        news: [...state.news, payload],
      };
    case UPDATE_NEWS:
      return {
        ...state,
        news: [...state.news.filter((news) => news.id !== payload.id), payload],
      };
    case DELETE_NEWS:
      return {
        ...state,
        news: [...state.news.filter((news) => news.id !== payload)],
      };
    case FETCH_NEWS:
      return {
        ...state,
        news: [...state.news, ...payload.news],
        moreNews: payload.moreNews,
        lastVisible: payload.lastVisible,
      };
    case LISTEN_TO_SELECTED_NEWS:
      return {
        ...state,
        selectedNews: payload,
      };
    case CLEAR_NEWS:
      return {
        ...state,
        news: [],
        moreNews: true,
        lastVisible: null,
      };
    case SET_FILTER:
      return {
        ...state,
        retainState: false,
        moreNews: true,
        filter: payload,
      };
    case SET_DATE:
      return {
        ...state,
        retainState: false,
        moreNews: true,
        date: payload,
      };
    case RETAIN_STATE:
      return {
        ...state,
        retainState: true,
      };

    default:
      return state;
  }
}
