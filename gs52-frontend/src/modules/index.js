import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import test from "./test";
import manager, { managerSaga } from "./manager/manager";
import emp from "./emp/emp";
import task, { taskSaga } from "./task/task";
import changeState from "./changeStore";
const rootReducer = combineReducers({
  test,
  manager,
  changeState,
  emp,
  task
});

export function* rootSaga() {
  yield all([taskSaga(), managerSaga()]);
}
export default rootReducer;
