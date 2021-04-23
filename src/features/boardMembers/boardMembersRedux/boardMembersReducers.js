import {
  CLEAR_BOARD_MEMBERS,
  CREATE_BOARD_MEMBER,
  DELETE_BOARD_MEMBER,
  FETCH_BOARD_MEMBERS,
  LISTEN_TO_SELECTED_BOARD_MEMBERS,
  LISTEN_TO_BOARD_MEMBER_PHOTOS,
  UPDATE_BOARD_MEMBER,
  SET_FILTER,
  SET_DATE,
  RETAIN_STATE,
  CLEAR_SELECTED_BOARD_MEMBER,
} from "./boardMembersConstants";

const initialState = {
  members: [],
  moreMembers: true,
  selectedMember: null,
  lastVisible: null,
  filter: "all",
  date: new Date("01/01/2020"),
  retainState: false,
  photos: [],
};

export default function membersReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case CREATE_BOARD_MEMBER:
      return {
        ...state,
        members: [...state.members, payload],
      };
    case UPDATE_BOARD_MEMBER:
      return {
        ...state,
        members: [
          ...state.members.filter((member) => member.id !== payload.id),
          payload,
        ],
      };
    case DELETE_BOARD_MEMBER:
      return {
        ...state,
        members: [...state.members.filter((member) => member.id !== payload)],
      };
    case FETCH_BOARD_MEMBERS:
      return {
        ...state,
        members: payload,
        moreMembers: payload.moreMembers,
        lastVisible: payload.lastVisible,
      };
    case LISTEN_TO_SELECTED_BOARD_MEMBERS:
      return {
        ...state,
        selectedMember: payload,
      };
    case CLEAR_BOARD_MEMBERS:
      return {
        ...state,
        members: [],
        moreMembers: true,
        lastVisible: null,
      };
    case CLEAR_SELECTED_BOARD_MEMBER:
      return {
        ...state,
        selectedMember: null,
      };
    case SET_FILTER:
      return {
        ...state,
        retainState: false,
        moreMembers: true,
        filter: payload,
      };
    case SET_DATE:
      return {
        ...state,
        retainState: false,
        moreMembers: true,
        date: payload,
      };
    case RETAIN_STATE:
      return {
        ...state,
        retainState: true,
      };
    case LISTEN_TO_BOARD_MEMBER_PHOTOS:
      return {
        ...state,
        photos: payload,
      };
    default:
      return state;
  }
}
