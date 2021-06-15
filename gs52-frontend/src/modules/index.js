import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import test from "./test";
const rootReducer = combineReducers({
  test,
});

// export function* rootSaga() {
//   yield all([authSaga(), userSaga()]);
// }
export default rootReducer;
