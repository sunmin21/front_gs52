import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import test from "./test";
import changeState from "./changeStore";
const rootReducer = combineReducers({
  test,
  changeState,
});

// export function* rootSaga() {
//   yield all([authSaga(), userSaga()]);
// }
export default rootReducer;
