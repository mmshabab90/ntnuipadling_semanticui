import { combineReducers } from "redux";
import authReducer from "../../features/auth/authReducer";
import eventReducer from "../../features/events/eventsRedux/eventReducers";
import testReducer from "../../features/sandbox/testReducer";
import asyncReducer from "../async/asyncReducer";
import modalReducer from "../common/modals/modalReducer";
import profileReducer from "./../../features/profiles/profileStores/profileReducer";
import newsReducer from "../../features/news/newsRedux/newsReducers";
import boardMembersReducers from "../../features/boardMembers/boardMembersRedux/boardMembersReducers";
import { connectRouter } from "connected-react-router";
import infoReducer from "../../features/information/infoRedux/infoReducer";

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    test: testReducer,
    event: eventReducer,
    news: newsReducer,
    info: infoReducer,
    members: boardMembersReducers,
    modals: modalReducer,
    auth: authReducer,
    async: asyncReducer,
    profile: profileReducer,
  });

export default rootReducer;
