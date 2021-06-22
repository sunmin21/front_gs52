import { combineReducers } from "redux";

import test from "./test";
import changeState from "./changeStore";
import emp from "./emp";
import task from "./task";
const rootReducer = combineReducers({
  test,
  changeState,
  emp,
  task,
});

// export function* rootSaga() {
//   yield all([authSaga(), userSaga()]);
// }
export default rootReducer;
