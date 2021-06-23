import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import test from "./test";
import changeState from "./changeStore";
import emp from "./emp/emp";
import task, { taskSaga } from "./task/task";
const rootReducer = combineReducers({
  test,
  changeState,
  emp,
  task,
});

export function* rootSaga() {
  yield all([taskSaga()]);
}
export default rootReducer;
