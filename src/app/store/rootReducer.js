import { combineReducers } from "redux";
import eventReducer from "../../features/events/eventsRedux/eventReducers";
import testReducer from "../../features/sandbox/testReducer";

const rootReducer = combineReducers({
  test: testReducer,
  event: eventReducer,
});

export default rootReducer;
